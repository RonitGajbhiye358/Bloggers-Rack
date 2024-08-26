import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {  // You can adjust this value to when the header should change
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


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
    <div className="w-100vw h-full overflow-clip overflow-y-scroll">
      <Header />
      <main >
        <Outlet/>
      </main>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[url('/background-picture.jpeg')]">
      <div className="text-center text-black">
        <div className="loader animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-black mx-auto"></div>
        <h2 className="mt-8 text-2xl md:text-4xl font-semibold animate-pulse">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default App;
