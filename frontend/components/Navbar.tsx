"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCurrentUser, logoutUser } from "@/lib/api";

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (mounted) {
          setUsername(user.username);
        }
      } catch {
        if (mounted) {
          setUsername(null);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setUsername(null);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">FindAHome</span>
              <span className="ml-2 text-xl">🇰🇪</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/search" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Search
              </Link>
              <Link href="/recommendations" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                For You
              </Link>
              <Link href="/preferences" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Preferences
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {username ? (
              <>
                <span className="text-sm text-gray-600">Hi, {username}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-3 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign in
                </Link>
                <Link href="/register" className="ml-3 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}