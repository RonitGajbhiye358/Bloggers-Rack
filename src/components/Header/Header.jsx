import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
  <header  className="w-100vw py-3 shadow bg-[rgb(11,20,47)] bg-opacity-85 backdrop-filter backdrop-blur-lg sticky top-0 z-30 ">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center gap-8 ">
            {navItems.map((item) =>          
              item.active ? (
                <li key={item.name} className={`flex justify-center items-center hover:bg-white hover:bg-opacity-20 cursor-pointer rounded-xl pl-4 
                ${location.pathname === item.slug ? "bg-white bg-opacity-20" : ""}`}>
                  <img src={`${item.name}.png`} alt={item.name} className="w-7 h-7 invert"/>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 text-white text-lg 
                      `}
                  >{item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
                <LogoutBtn />
            )}
          </ul>
          
          
        </nav>
      </Container>
    </header>
  );
}

export default Header;
