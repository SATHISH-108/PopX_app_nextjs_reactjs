"use client";

import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const signinHandler = async (e) => {
    e.preventDefault();
    if (!user.email && !user.password) {
      toast.error("Email & password are required");
      return;
    } else if (!user.email) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      toast.error("Invalid email format");
      return;
    } else if (!user.password) {
      toast.error("Pasword is required");
      return;
    }
    let response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
    if (response.ok && !response.error) {
      const { user } = await getSession();
      await localStorage.setItem("user", JSON.stringify(user));
      setUser({
        ...user,
        name: user.name,
        email: user.email,
        id: user.id,
        password: user.password,
      });
      toast.success("Login successfully");
      setUser({ ...user, email: "", password: "" });
      router.push("/profile");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="h-[100vh] bg-white flex items-center">
      <div className="h-[95vh] w-full max-w-md mx-4 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between border-0.5">
        <div>
          <h2 className="text-2xl font-bold mb-2 max-w-48">
            Signin to your PopX account
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
          <div className="flex flex-col space-y-4">
            <div>
              <label
                name="email"
                className="block text-sm text-purple-700 font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label
                name="password"
                className="block text-sm text-purple-700 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              className="bg-gray-300 text-white py-2 rounded-md cursor-pointer"
              onClick={signinHandler}
            >
              Login
            </button>
            New user?{" "}
            <button className="bg-purple-700 text-white py-2 rounded-md cursor-pointer">
              <Link href="/signup"> Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
