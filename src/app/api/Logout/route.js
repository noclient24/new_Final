import { NextResponse } from "next/server";

export const POST = (request) => {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    response.cookies.set("logintoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response
  } catch (error) {
    return NextResponse.json(error, {
      message: error.message,
      status: 224,
    });
  }
};
