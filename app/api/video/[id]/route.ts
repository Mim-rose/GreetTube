import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await connectToDatabase();
    const video = await Video.findById(id).lean();

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}