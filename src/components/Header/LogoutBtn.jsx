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
    <div className=" bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 animate-gradient-x cursor-pointer md:ml-8 rounded-xl ">
      <button
        onClick={logoutHandler}
        title="Sign Out"
        className=" group flex justify-center items-center font-semibold gap-0 md:gap-4 p-3 md:px-4 md:py-2 text-white rounded-md text-lg h-11  text-center group-hover:text-black "
      >
        <img
          src="Logout.png"
          alt="Logout"
          className="invert w-7 h-7 group-hover:invert-0"
        />
        <div className="collapse md:visible w-0 md:w-auto group-hover:invert">Sign Out</div>
      </button>
    </div>
  );
}

export default LogoutBtn;
