import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    if (typeof window === "undefined") {
      const { getServerSession } = await import("next-auth");
      const { authOptions } = await import("@/lib/auth");

      const session = await getServerSession(authOptions);
      const token = session?.accessToken; // ✅ Assumes token is injected via callbacks

      if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    console.log("Calling:", `${baseUrl}/api/${endpoint}`);
    console.log("Response content-type:", response.headers.get("content-type"));

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      const html = await response.text();
      console.error("Received HTML instead of JSON:", html);
      throw new Error("API returned HTML instead of JSON");
    }

    if (!response.ok) {
      console.error("API Error:", response.status, await response.text());
      throw new Error("API call failed");
    }

    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("video");
  }

  async getVideoById(id: string) {
    return this.fetch<IVideo>(`video/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>("video", {
      method: "POST",
      body: videoData,
    });
  }

  async getCurrentUser() {
    return this.fetch<{ user: { name?: string; email: string; image?: string } }>("user");
  }
}

export const apiClient = new ApiClient();