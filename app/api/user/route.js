import { API_URL } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("jwt");

  if (!token)
    return NextResponse.json(
      {
        message: "Not Authorized",
      },
      { status: 403 }
    );

  const strapiRes = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    return NextResponse.json(
      {
        user: data,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        message: data?.error?.message,
      },
      { status: 400 }
    );
  }
}
