"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { postApiData } from "@/helper/common";

export default function Home() {
  // State for login fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 
  // Function to handle login
  const AddUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    const apiData = { email, password };

    try {
      const data = await postApiData(`users/login`, apiData);

      if (data.success) {
        toast.success("User Login Successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });

        location.href="/user"
      
      } else {
        toast.error(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={AddUser} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  placeholder="Enter Email Id"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-2 border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
  Demo?{" "}
  <span className="font-semibold text-indigo-600 bg-gray-200 px-2 py-1 rounded">
    email: hamidali@gmail.com | password: admin
  </span>
</p>

        </div>
      </div>
      <Toaster />
    </>
  );
}
