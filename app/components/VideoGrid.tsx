import VideoCard from "./VideoCard";
import { IVideo } from "@/models/Video";

export default function VideoGrid({ videos }: { videos: IVideo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video._id?.toString()} video={video} />
      ))}
    </div>
  );
}