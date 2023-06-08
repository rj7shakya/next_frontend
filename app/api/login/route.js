import { API_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { identifier, password } = await request.json();

  const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  const data = await strapiRes.json();

  if (data?.user) {
    const response = NextResponse.json(
      {
        user: data.user,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "jwt",
      value: data.jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        message: data?.error?.message,
      },
      { status: 400 }
    );
  }
}
