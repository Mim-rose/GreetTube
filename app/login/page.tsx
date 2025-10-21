"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

      if (result?.error) {
  if (result.error === "No user found") {
    alert("No account found. Please sign up first.");
    router.push("/register"); // ✅ Redirect to register page
  } else if (result.error === "Not valid password") {
    alert("Incorrect password. Please try again.");
  } else {
    alert("Login failed. Please check your credentials.");
  }
} else {
  router.push("/");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
  type="password"
  name="password"
  placeholder="Password"
  autoComplete="current-password" // ✅ Fixes browser warning
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
  <button
    onClick={() => signIn("google")}
    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition-colors"
  >
    <FcGoogle size={24} />
    <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
  </button>
</div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}