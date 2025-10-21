import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoCard({ video }: { video: IVideo }) {
  return (
    video._id && (
      <Link href={`/watch/${video._id.toString()}`}>
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div className="p-4">
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.description}</p>
          </div>
        </div>
      </Link>
    )
  );
}