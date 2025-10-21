"use client"; // This component must be a client component

import { apiClient } from "@/lib/api-client";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/mp4")) {
        setError("Please upload a valid video file");
        return false;
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100MB");
      return false;
    }

    return true;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    if (!publicKey) {
      setError("Missing ImageKit public key");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const authJson = await authRes.json();
      const auth = authJson.authenticationParameters; // ✅ Extract nested object

     const res = await upload({
  file,
  fileName: file.name,
  publicKey,
  signature: auth.signature,
  expire: auth.expire,
  token: auth.token,
  onProgress: (event) => {
    if (event.lengthComputable && onProgress) {
      const percent = (event.loaded / event.total) * 100;
      onProgress(Math.round(percent));
    }
  },
});
if (!res.url) {
  throw new Error("Upload failed: missing video URL");
}


const videoUrl = res.url;
const thumbnailUrl = `${videoUrl}?tr=w-400,h-300,fo-auto`; // ✅ Dynamic thumbnail

await apiClient.createVideo({
  title: file.name,
  description: "Uploaded via ImageKit",
  videoUrl,
  thumbnailUrl,
});
     
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && <span>Loading...</span>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default FileUpload;