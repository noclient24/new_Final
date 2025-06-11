import { NextResponse } from "next/server";

export function middleware(request) {
  const jwt = request.cookies.get("logintoken")?.value;

  console.log(jwt);

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const Authpath =
    request.nextUrl.pathname === "/Login" ||
    request.nextUrl.pathname === "/Signup";

  if (jwt && Authpath) {
    return NextResponse.redirect(new URL("/add_Task", request.url));
  }

  if (!jwt && !Authpath) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/add_Task", "/Show_Task", "/Login", "/Signup"],
};
