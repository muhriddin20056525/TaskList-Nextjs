"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">My Task</h1>

      <nav className="flex space-x-4">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md transition"
        >
          My Task
        </Link>
        <Link
          href="/create-task"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md transition"
        >
          Create Task
        </Link>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md transition"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
