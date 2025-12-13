import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { user, password } = body; // user = email or phone

    const foundUser = await User.findOne({
      $or: [{ email: user }, { phone: user }],
    });

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (foundUser.password !== password) {
      return Response.json(
        { success: false, message: "Wrong password" },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Login success",
        user: {
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          wallet: foundUser.wallet,
          order: foundUser.order,
          userId: foundUser.userId,
          userType: foundUser.userType,
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
