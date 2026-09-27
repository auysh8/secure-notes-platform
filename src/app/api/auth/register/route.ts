import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return NextResponse.json({ message: "User Register" }, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export { POST };
