import { userModel } from "@/app/model/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const Tokenget = request.cookies.get("logintoken")?.value;

    if (!Tokenget) {
      return NextResponse.json({
        message: "Cookies Not Found",
        status: 500,
      });
    }

    const decode = jwt.verify(Tokenget, process.env.JWT_KEY);

    const users = await userModel.findById(decode._id).select("-password");
    if (!users) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error, {
      message: error,
      status: 400,
    });
  }
};
