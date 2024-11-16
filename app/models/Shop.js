import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  userId: String, // Add this if needed for login
  password: String, // Add this if needed for login
  name: String,
  location: String,
  coordinates: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  inventory: [
    {
      medicine: String,
      available: Boolean,
    },
  ],
});

shopSchema.index({ coordinates: '2dsphere' });

export default mongoose.models.Shop || mongoose.model('Shop', shopSchema);
