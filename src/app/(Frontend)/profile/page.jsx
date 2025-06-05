"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function AccountPage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser({ ...user, name: user.name, email: user.email });
      setLoading(false);
    } else {
      router.push("signin");
      // router.push("/");
    }
  }, []);
  const logoutHandler = () => {
    localStorage.clear();
    router.push("/signin");
  };
  return (
    <div className="bg-white ">
      <h2 className="text-xl font-bold mb-4 bg-white  p-3">Account Settings</h2>
      <div className="bg-gray-100 h-[90vh]">
        {!loading ? (
          <>
            <div className=" p-4 flex items-start space-x-4 shadow">
              <div className="relative">
                <img
                  src="/Female_image.jpeg"
                  alt="Profile"
                  className="w-60 h-16 object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 bg-purple-600 text-white p-0.5 rounded-full text-xs">
                  📷
                </span>
              </div>
              <div>
                <p className="font-bold">
                  {user.name.charAt(0).toUpperCase() +
                    user.name.slice(1).toLowerCase()}
                </p>
                <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed
                  Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
                  Aliquyam Erat, Sed Diam
                </p>
              </div>
            </div>
            <center className="mt-10 mr-3 ml-3">
              <button
                className="bg-red-400 p-1 rounded-md text-white h-12 w-full cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </center>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[90vh">
            <p className="tex-xl mt-10">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
