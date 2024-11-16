import Shop from '../../../models/Shop.js';
import connectMongo from '../../../lib/connectmongo.js';

export async function POST(req) {
  await connectMongo();

  const { userId, password, shopName, location } = await req.json();

  const existingShop = await Shop.findOne({ userId });

  if (existingShop) {
    return new Response(JSON.stringify({ message: 'Shop already registered' }), {
      status: 409,
    });
  }

  const newShop = await Shop.create({
    userId:userId,
    password:password,
    name: shopName,
    coordinates: {
      type: 'Point',
      coordinates: location.split(',').map(Number),
    },
  });

  return new Response(JSON.stringify({ message: 'Signup successful' }), {
    status: 201,
  });
}
