// import mongoose from 'mongoose';
import connectMongo from '../../../lib/connectmongo.js';
import Shop from '../../../models/Shop.js';

import pharmaciesData from './filtered_pharmacies.json' assert { type: 'json' };
import medData from './meds.json' assert { type: 'json' };

// Randomly assign availability status
const randomAvailability = () => Math.random() < 0.5;

// Generate unique usernames and passwords
const generateUsername = (name, index) => `shop_${name.replace(/\s+/g, '_').toLowerCase()}_${index}`;
const generatePassword = () => Math.random().toString(36).slice(-8); // Random 8-character password

// Format data to include usernames and passwords
const formatPharmacyData = (pharmacies, meds) => {
  return pharmacies.map((pharmacy, index) => ({
    userId: generateUsername(pharmacy.name, index),
    password: generatePassword(),
    name: pharmacy.name,
    location: pharmacy.address,
    coordinates: {
      type: 'Point',
      coordinates: [pharmacy.coordinates.longitude, pharmacy.coordinates.latitude],
    },
    inventory: meds.map((med) => ({
      medicine: med.name,
      available: randomAvailability(),
    })),
  }));
};

// Seed the database
const seedDatabase = async () => {
  try {
    await connectMongo();

    const formattedPharmacies = formatPharmacyData(pharmaciesData, medData);

    // Clear existing data
    await Shop.deleteMany({});

    // Insert new data
    await Shop.insertMany(formattedPharmacies);

    // Log usernames and passwords for reference
    formattedPharmacies.forEach((shop) => {
      console.log(`Username: ${shop.userId}, Password: ${shop.password}`);
    });

    console.log('Database seeded successfully with filtered pharmacies!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding the database:', err);
  }
};

seedDatabase();
