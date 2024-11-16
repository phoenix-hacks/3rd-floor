import Shop from '../../models/Shop.js';
import connectMongo from '../../lib/connectmongo.js';

export async function POST(req) {
  await connectMongo();

  try {
    const { inventory, shopId } = await req.json();

    if (!shopId) {
      return new Response(JSON.stringify({ message: 'Shop ID is required' }), {
        status: 400,
      });
    }

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return new Response(JSON.stringify({ message: 'Shop not found' }), {
        status: 404,
      });
    }

    shop.inventory = inventory;

    await shop.save();

    return new Response(JSON.stringify({ message: 'Inventory updated successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    return new Response(JSON.stringify({ message: 'Error updating inventory' }), {
      status: 500,
    });
  }
}
