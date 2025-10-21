"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";

type User = {
  name?: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiClient.getCurrentUser()
      .then((res) => setUser(res.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* 🍔 Left: Menu + Logo */}
      <div className="flex items-center gap-4">
        <button className="text-xl">☰</button>
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            GreetTube
          </span>
        </Link>
      </div>

      {/* 🔍 Center: Search */}
      <div className="flex-grow flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded border w-96"
        />
      </div>

      {/* ➕ 🔔 👤 Right: Actions */}
      <div className="flex items-center gap-4">
        <Link href="/upload">
          <button className="text-xl">➕</button>
        </Link>
        <button className="text-xl">🔔</button>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">
              {user.name ?? user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-500 underline"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
  <Link href="/login">
    <button className="bg-gradient-to-r from-purple-400 to-blue-400 text-white px-4 py-1 rounded shadow hover:opacity-90 transition">
      Sign in
    </button>
  </Link>
  <Link href="/register">
    <button className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-1 rounded shadow hover:opacity-90 transition">
      Sign Up
    </button>
  </Link>
</>
        )}
      </div>
    </nav>
  );
}