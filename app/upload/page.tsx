"use client";
import FileUpload from "../components/FileUpload";

export default function UploadPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Upload a Video</h1>
      <FileUpload
        fileType="video"
        onSuccess={(res) => alert("Upload successful!")}
        onProgress={(p) => console.log("Progress:", p)}
      />
    </main>
  );
}