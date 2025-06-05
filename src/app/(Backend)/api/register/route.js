import DBConnection from "@/librabry/mongodb";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  DBConnection();
  let users = await UserModel.find({});
  return NextResponse.json({ users });
}

export async function POST(request) {
  DBConnection();
  const { name, phone, email, password, company, agency } =
    await request.json();
  const user = { name, phone, email, password, company, agency };

  if (!name || !phone || !email || !password || !company) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  } else if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  } else if (!phone) {
    return NextResponse.json(
      { message: "Phone Number is required" },
      { status: 400 }
    );
  } else if (!/^\d{10}$/.test(phone)) {
    return NextResponse.json(
      { message: "Phone number must be exactly 10 digits" },
      { status: 400 }
    );
  } else if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  } else if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  } else if (!company) {
    return NextResponse.json(
      { message: "Company name is required" },
      { status: 400 }
    );
  }
  const existingEmail = await UserModel.findOne({ email: user.email });
  if (existingEmail) {
    return NextResponse.json(
      { message: "Email is already taken" },
      { status: 400 }
    );
  }
  const bcryptedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({ ...user, password: bcryptedPassword });
  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 200 }
  );
}
