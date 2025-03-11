import { connectToDB } from "@/lib/mongoose";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, Email and Password are required" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User alread exist" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      tasks: [],
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
