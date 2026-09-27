import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesnt exists" },
        { status: 401 },
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ Message: "Wrong Password" }, { status: 401 });
    }
    if (!process.env.JWT) {
      throw new Error("Jwt secret is not set");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });
    return NextResponse.json(
      { token, name: user.name, message: "User logged in" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Internal Server Error");
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export { POST };
