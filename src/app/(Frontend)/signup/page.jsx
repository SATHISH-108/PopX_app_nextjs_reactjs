"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const signupPage = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  });
  const router = useRouter();
  const signupHandler = async (e) => {
    e.preventDefault();
    console.log("user", user);
    let response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      ContentType: "application/json",
      body: JSON.stringify(user),
    });
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
    if (response.ok && response.status === 200) {
      toast.success(data.message);
      setUser({
        ...user,
        name: "",
        phone: "",
        email: "",
        password: "",
        company: "",
      });
      router.push("/signin");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="h-[100vh] bg-white flex items-center">
      <div className="h-[95vh] w-full max-w-md mx-4 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between border-0.5">
        <div>
          <h2 className="text-2xl font-bold max-w-48 mb-6">
            Create your PopX account
          </h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm text-purple-700 font-semibold ">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ENTER NAME"
                value={
                  user.name.charAt(0).toUpperCase() +
                  user.name.slice(1).toLowerCase()
                }
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-700 font-semibold">
                Phone number<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="ENTER NAME"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-700 font-semibold">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="ENTER EMAIL"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-700 font-semibold">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="ENTER PASSWORD"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-700 font-semibold">
                Company name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ENTER NAME"
                value={user.company}
                onChange={(e) => setUser({ ...user, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-700 font-semibold">
                Are you an Agency?<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="agency"
                    className="mr-2"
                    onChange={(e) =>
                      setUser({ ...user, agency: e.target.value })
                    }
                    defaultChecked
                  />{" "}
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="agency"
                    className="mr-2"
                    onChange={(e) =>
                      setUser({ ...user, agency: e.target.value })
                    }
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Create Account Button */}
        <div>
          <button
            className="bg-purple-600 text-white py-3 rounded-md cursor-pointer w-full mb-5"
            onClick={signupHandler}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default signupPage;
