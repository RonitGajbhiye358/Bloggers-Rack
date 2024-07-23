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
        <nav className="flex flex-col items-center md:flex-row">
          <div className=" md:mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex md:ml-auto items-center gap-8 ">
            {navItems.map((item) =>          
              item.active ? (
                <li key={item.name} className={` hover:bg-white hover:bg-opacity-20 cursor-pointer rounded-xl 
                ${location.pathname === item.slug ? "bg-white bg-opacity-20" : ""}`}>
                  <button
                    onClick={() => navigate(item.slug)}
                    title={`${item.name}`}
                    className={`flex justify-center items-center gap-0 md:gap-4 p-3 md:px-4 md:py-2 duration-200 text-white text-lg 
                      `}
                  ><img src={`public/${item.name}.png`} alt={item.name}  className="w-7 h-7 invert "/>
                    <div className="collapse md:visible w-0 md:w-auto text-[0px] md:text-lg ">{item.name}</div>
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
