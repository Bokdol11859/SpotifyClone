import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true
  // 1. It is a request for next-auth session & provider fetching
  // 2. Token Exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  if (pathname == "/login" && token) {
    return NextResponse.redirect("/");
  }
  // Else redirect user to the login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
