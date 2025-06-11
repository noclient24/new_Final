import { ConnectDB } from "@/app/Helper/db";
import { usersTask } from "@/app/model/TaskModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const POST = async (request) => {
  try {
    await ConnectDB();

    const Tokenget = request.cookies.get("logintoken")?.value;

    const decode = jwt.verify(Tokenget, process.env.JWT_KEY);

    const { tittle, content, Date, status, UserId } = await request.json();

    const Taskget = new usersTask({
      tittle,
      content,
      Date,
      status,
      UserId: decode._id,
    });

    const Tasksave = await Taskget.save();

    return NextResponse.json(Tasksave, {
      message: "Task sucessfully Save",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      status: 202,
    });
  }
};
