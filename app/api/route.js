import { NextResponse } from "next/server";

const { events } = require("./data.json");

export async function GET() {
  return NextResponse.json(events);
}
