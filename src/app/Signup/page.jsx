"use client";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "../servies/Signup";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const Handsubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await Signup({
        name: formData.name,
        email: formData.email,
        about: formData.about,
        password: formData.password,
      });

      console.log(result);

      if (result?._id) {
        // Change this to match your API response structure
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("../Login");
        }, 1500);
      } else {
        toast.error(result?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-500 to-amber-500 flex items-center justify-center p-4">
      {/* 3D Card Container */}
      <div className="relative w-full max-w-md">
        {/* Back Card (3D effect) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>

        {/* Main Card */}
        <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden p-8 border border-orange-500 border-opacity-20 transform transition-all hover:scale-[1.02] duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
              Create Account
            </h2>
            <p className="text-orange-200">
              Join us today and unlock amazing features!
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={Handsubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-user text-orange-400 mr-3"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-envelope text-red-400 mr-3"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-lock text-amber-400 mr-3"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-lock text-orange-400 mr-3"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center bg-gray-800 rounded-lg px-4 py-3">
                <i className="fas fa-user text-amber-400 mr-3"></i>

                <input
                  type="text"
                  name="about"
                  placeholder="About"
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                  className="w-full bg-transparent text-white placeholder-orange-200 focus:outline-none"
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-orange-800/50 hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Sign Up <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-orange-300">
            <p>
              Already have an account?
              <Link
                href="../Login"
                className="text-orange-400 hover:text-red-400 ml-1"
              >
                Login
              </Link>
            </p>
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
    </div>
  );
};

export default SignupPage;
