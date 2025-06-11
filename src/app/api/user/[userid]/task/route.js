import { usersTask } from "@/app/model/TaskModel";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/app/Helper/db";

export const GET = async (request, { params }) => {
  try {
    await ConnectDB();

    // First await the params, then destructure
    const { userid } = await params;

    console.log("the user id is ", userid)
    const tasks = await usersTask.find({
      UserId: userid
    });
    return NextResponse.json(tasks);

  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { message: "Failed to retrieve tasks", status: false, error: error.message },
      { status: 500 }
    );
  }
};