"use client";
import { getSession } from "next-auth/react";
import Link from "next/link";
export default function WelcomePage() {
  const { user } = getSession();
  console.log("user_homepage", user);

  return (
    <div className="flex flex-col justify-end items-start h-screen p-4 ">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2 max-w-72">Welcome to PopX</h1>
        <p className="text-gray-500  max-w-64 text-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>
      <button className="bg-purple-600 text-white w-full py-3 rounded-md mb-3 cursor-pointer">
        <Link href="/signup"> Create Account</Link>
      </button>
      <button className="bg-purple-200 text-black font-semibold w-full py-3 rounded-md cursor-pointer mb-8">
        <Link href="/signin">Already Registered? Login</Link>
      </button>
    </div>
  );
}
