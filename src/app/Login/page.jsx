"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { LoginRequest } from "../servies/Signup";

const Login = () => {
  const [fromData, serFromData] = useState({
    email: "",
    password: "",
  });

  const CheakData = () => {
    if (!fromData.email.trim() || !fromData.password.trim()) {
      toast.info("Please fill all fields", { position: "top-center" });
      return;
    }
  };

  const Handsubmit = async (e) => {
    e.preventDefault();
    CheakData();

    try {
      const response = await LoginRequest(fromData);

      if (response) {
        toast.success("Login successful!", { position: "top-center" });
        window.location.href = "/add_Task";
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed", {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-500 to-amber-500 flex items-center justify-center p-4">
        {/* 3D Card Container */}
        <div className="relative w-full max-w-md">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

          {/* Main Card */}
          <div className="relative bg-black bg-opacity-70 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden p-8 border border-orange-500 border-opacity-30">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                <i className="fas fa-fire mr-2"></i> Welcome Back
              </h2>
              <p className="text-orange-200 mt-2">
                Sign in to access your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={Handsubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center bg-gray-900 rounded-lg px-4 py-3 border border-orange-900">
                  <i className="fas fa-envelope text-orange-400 mr-3"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={fromData.email}
                    onChange={(e) =>
                      serFromData({ ...fromData, email: e.target.value })
                    }
                    className="w-full bg-transparent text-orange-100 placeholder-orange-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center bg-gray-900 rounded-lg px-4 py-3 border border-red-900">
                  <i className="fas fa-lock text-red-400 mr-3"></i>
                  <input
                    type="password"
                    name="password"
                    value={fromData.password}
                    onChange={(e) =>
                      serFromData({ ...fromData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full bg-transparent text-orange-100 placeholder-orange-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-bold text-white shadow-lg hover:shadow-orange-800/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-orange-300">
              <p>
                Don't have an account?{" "}
                <Link
                  href="../Signup"
                  className="font-medium text-orange-400 hover:text-orange-200 underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Login;
