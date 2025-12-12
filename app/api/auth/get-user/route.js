import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { identifier } = body; 
    // identifier = email or phone

    if (!identifier) {
      return Response.json(
        { success: false, message: "Email or Phone is required" },
        { status: 400 }
      );
    }

    // Find user by email OR phone
    const foundUser = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User found",
        user: {
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          wallet: foundUser.wallet,
          order: foundUser.order,
          userId: foundUser.userId,
          createdAt: foundUser.createdAt,
          updatedAt: foundUser.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
