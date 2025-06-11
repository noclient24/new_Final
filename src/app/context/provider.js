"use client";
import { useEffect, useState } from "react";
import UserContext from "./context";
import { Current } from "../servies/Signup";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const currentUser = await Current();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const handleFocus = () => fetchUser();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refetchUser: fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};