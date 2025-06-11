import { ConnectDB } from "@/app/Helper/db";
import { usersTask } from "@/app/model/TaskModel";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    await ConnectDB();
    const { taskId } = params;
    console.log(taskId);
    const response = await usersTask.deleteOne({
      _id: taskId,
    });
    return NextResponse.json("Task Deleted !!");
  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{
      message: ["This is a Task Delete Error"],
      status: 500,
    });
  }
};
