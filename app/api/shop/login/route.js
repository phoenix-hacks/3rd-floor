import Shop from '../../../models/Shop.js';
import connectMongo from '../../../lib/connectmongo.js';

export async function POST(req) {
  await connectMongo();

  const { userId, password } = await req.json();

  const shop = await Shop.findOne({ userId });

  if (!shop) {
    return new Response(JSON.stringify({ message: 'Shop not registered' }), {
      status: 404,
    });
  }

  if (shop.password !== password) {
    return new Response(JSON.stringify({ message: 'Invalid password' }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
  });
}
