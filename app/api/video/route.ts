import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    console.log("✅ Connected to MongoDB (GET)");

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("GET error details:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log("Incoming video upload request");

  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    console.log("✅ Connected to MongoDB (POST)");

    const body: IVideo = await request.json();
    console.log("Request body:", body);

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      console.log("Missing fields in request body:", body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Validating fields:", {
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      thumbnailUrl: body.thumbnailUrl,
    });

    const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    console.log("Uploaded")
    console.log("Video saved:", newVideo);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to create a video" },
      { status: 500 }
    );
  }
}
