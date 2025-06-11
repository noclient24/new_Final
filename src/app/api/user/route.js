import { ConnectDB } from "@/app/Helper/db";
import { userModel } from "@/app/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    await ConnectDB();
    const { name, email, password, about, ProfileURL } = await request.json();

    const Existuser = await userModel.findOne({ email });

    if (Existuser) {
      return NextResponse.json({
        message: "User is already",
        status: false,
      });
    }

    const newuser = new userModel({
      name,
      email,
      password,
      about,
      ProfileURL,
    });

    newuser.password = await bcrypt.hash(
      newuser.password,
      parseInt(process.env.bcrypt_Salt)
    );

    const usersave = await newuser.save();

    return NextResponse.json(usersave, {
      message: "User created successfully ",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{
      status:201
    });
  }
};






