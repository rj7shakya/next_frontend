import { NextResponse } from "next/server";

const { events } = require("../data.json");

export async function GET(request, { params: { slug } }) {
  const evt = events.filter((ev) => ev.slug === slug);

  return NextResponse.json(evt);
}
