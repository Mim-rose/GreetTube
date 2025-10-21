"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import VideoGrid from "./components/VideoGrid";
import Navbar from "./components/Navbar"; // ✅ Import Navbar

export default function HomePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchVideos() {
    try {
      const data = await apiClient.getVideos();
      console.log("Homepage received videos:", data);
      setVideos(data);
    } catch (err) {
      console.error("Homepage fetch error:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchVideos();
}, []);

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar */}
      <main className="pt-20 px-6"> {/* ✅ Add padding to avoid overlap */}
        <h2 className="text-xl font-semibold mb-4">🎬 Explore Videos</h2>
        {loading ? <p>Loading...</p> : <VideoGrid videos={videos} />}
      </main>
    </>
  );
}
