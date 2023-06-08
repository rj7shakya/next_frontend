import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({});

  response.cookies.set({
    name: "jwt",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(0),
    sameSite: "strict",
    path: "/",
  });

  return response;
}
