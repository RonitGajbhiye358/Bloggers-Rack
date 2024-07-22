import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className=" w-100vw relative bg-[rgb(11,20,47)] bg-opacity-85 backdrop-filter backdrop-blur-lg h-1/4  ">

      <div className="py-20 px-2 w-5/6 m-auto text-[rgb(117,117,117)] flex justify-between  gap-5 flex-col xl:flex-row">
        <div className="footer1 relative flex flex-col items-center">
          <Logo />
          <ul>
            <li className="flex justify-start items-center gap-2 m-3">
              <img className="w-5 h-5" src="msg.svg" alt="msg" />
              <a className="hover:text-gray-100" href="mailto:support@pwskills.com">
                <p className="text-base medium:text-base leading-[21px] medium:leading-6 hover:text-white  font-semibold text-gray-300">
                  support@gmail.com
                </p>
              </a>
            </li>
            <li className="flex justify-start items-center gap-2 m-3">
              <img className="w-5 h-5" src="call.svg" alt="call" />
              <a className="hover:text-gray-100" href="tel:+919422115745">
                <p className="text-base medium:text-base leading-[21px] medium:leading-6 hover:text-white  font-semibold text-gray-300">
                  +91-9422115745
                </p>
              </a>
            </li>
          </ul>
        </div>

        <div className=" flex  xl:justify-between w-3/5 mx-auto md:ml-0 lg:mr-auto xl:ml-auto xl:mr-0 flex-col  md:flex-row ">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-lg font-bold text-white  mb-4">Company</h1>
            <span className="absolute bg-[rgb(217,24,130)] w-1/2 md:w-[20rem] h-1 rounded"></span>
            <div className="flex flex-wrap justify-between mt-12 w-72 flex-col min-[500px]:flex-row min-[500px]:w-[28rem]">
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                About us
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Contact us
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                FAQ
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Privacy policy
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Job Assistance
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                T&C
              </a>
            </div>
          </div>
          <div >
            <h1 className="text-lg font-bold text-white mb-4">Products</h1>
            <span className="absolute bg-[rgb(217,24,130)] w-1/2 md:w-[20rem] h-1 rounded"></span>
            <div className="flex flex-wrap justify-between mt-12 w-72 flex-col min-[500px]:flex-row min-[500px]:w-[28rem]">
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base hover:text-white  leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Pw Skills Lab
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base hover:text-white  leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Job Portals
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Experience Portal
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base hover:text-white  leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Become an member
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Hall Of Fame
              </a>
              <a href="/#" className=" cursor-pointer w-1/2 py-3 text-base medium:text-base  hover:text-white leading-[21px] medium:leading-6 font-semibold text-gray-300">
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
