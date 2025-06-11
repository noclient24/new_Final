"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { LogoutRequest } from "../servies/Signup";
import { useRouter } from "next/navigation";
import Usecontext from "../context/context";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, loading } = useContext(Usecontext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await LogoutRequest();
      setUser(null);
      router.push("/Login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  console.log(user)
  // Show loading state or nothing while checking auth
  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Just show the logo while loading */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                TaskApp
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Rest of your navbar code...
  return (

    <nav className="bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                TaskApp
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link
                  href="../add_Task"
                  className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fas fa-plus-circle mr-2"></i> TaskAdd
                </Link>
                <Link
                  href="../Show_Task"
                  className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="fas fa-tasks mr-2"></i> ShowTask
                </Link>
              </div>
            </div>
          </div>

          {/* Right side navigation */}
         <div className="hidden md:block">
  <div className="ml-4 flex items-center space-x-4">
    {user && !user.message ? ( // Show user info if user exists and no error message
      <>
        <span className="text-white px-3 py-2 text-sm font-medium">
          <i className="fas fa-user mr-2"></i>
          {user.name || user.email}
        </span>
        <button
          onClick={handleLogout}
          className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
          aria-label="Logout"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </>
    ) : (
      <>
        <Link
          href="../Login"
          className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
        >
          <i className="fas fa-sign-in-alt mr-2"></i> Login
        </Link>
        <Link
          href="../Signup"
          className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          <i className="fas fa-user-plus mr-2"></i> Signup
        </Link>
      </>
    )}
  </div>
</div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <i className="fas fa-times h-6 w-6"></i>
              ) : (
                <i className="fas fa-bars h-6 w-6"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="../add_Task"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-plus-circle mr-2"></i> TaskAdd
            </Link>
            <Link
              href="../Show_Task"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-tasks mr-2"></i> ShowTask
            </Link>
            {user ? (
              <>
                <div className="text-white block px-3 py-2 text-base font-medium">
                  <i className="fas fa-user mr-2"></i> {user.name || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="../Login"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i> Login
                </Link>
                <Link
                  href="../Signup"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fas fa-user-plus mr-2"></i> Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
    // ... your existing navbar JSX
  )}