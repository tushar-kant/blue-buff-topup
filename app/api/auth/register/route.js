import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateUserId } from "@/lib/generateUserId";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, email, phone, password } = body;

    // check if user exists
    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return Response.json(
        { success: false, message: "Email or phone already registered" },
        { status: 400 }
      );
    }

    // Generate unique userId
    const userId = generateUserId(name, phone);

    const user = await User.create({
      userId,
      name,
      email,
      phone,
      password,
      wallet: 0,
      order: 0
    });

    return Response.json(
      { success: true, message: "User registered", user },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
