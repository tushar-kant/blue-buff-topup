import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const { email, phone } = await req.json();

    if (!email && !phone) {
      return Response.json(
        { success: false, message: "Email or phone is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({
      $or: [
        { email: email || null },
        { phone: phone || null }
      ]
    }).sort({ createdAt: -1 });

    return Response.json(
      { success: true, orders },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
