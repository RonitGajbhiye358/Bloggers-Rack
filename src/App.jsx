import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="w-100vw bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-x overflow-clip">
      <Header />
      <main className="overflow-y-scroll ">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center text-white">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white mx-auto"></div>
        <h2 className="mt-8 text-2xl md:text-4xl font-semibold animate-pulse">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default App;
