import { userModel } from "@/app/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/app/Helper/db";
import jwt from "jsonwebtoken";
export const POST = async (request) => {
  try {
    await ConnectDB();
    const { email, password } = await request.json();

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "Email not exist",
      });
    }

    const passwprdcompare = await bcrypt.compare(password, user.password);
    if (!passwprdcompare) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const Token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    const resposne = NextResponse.json({
      message: "Login successful",
      user: user,
      status: 201,
    });

    resposne.cookies.set("logintoken", Token, {
      httpOnly: true,
    });

    return resposne;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
    });
  }
};
