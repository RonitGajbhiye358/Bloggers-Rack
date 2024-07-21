import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
      <div className="group flex justify-center items-center bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 animate-gradient-x  cursor-pointer  my-1  rounded-xl pl-4">
        <img src="Logout.png" alt="Logout" className="invert w-7 h-7 group-hover:invert-0" />
        <button
          onClick={logoutHandler}
          className="  w-32 font-semibold  text-white rounded-md text-lg h-11  text-center group-hover:text-black "
        >
          Logout
        </button>
      </div>
  );
}

export default LogoutBtn;
