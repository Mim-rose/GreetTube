import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { notFound } from "next/navigation";

export default async function WatchPage({ params }: { params: { id?: string } }) {
  if (!params?.id) return notFound();

  try {
    const video: IVideo = await apiClient.getVideoById(params.id);

    return (
      <main className="p-6">
        <video
          src={video.videoUrl}
          controls
          className="w-full max-w-4xl mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
        <p className="text-gray-700 mt-2">{video.description}</p>
      </main>
    );
  } catch (error) {
    console.error("Failed to load video:", error);
    return notFound(); // ✅ Graceful fallback for 404 or fetch failure
  }
}