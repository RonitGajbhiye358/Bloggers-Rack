import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaSmile, FaCog } from "react-icons/fa";
import BlurFade from "./UI/BlueFade";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === 1 ? 2 : 1));
    }, 6000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="relative">
      <section1 className=" pointer-events-none relative h-screen list-item overflow-hidden ">
        <h1 className=" typing_animation text-3xl md:text-6xl mt-10 pb-4">
          Craft Your Digital Presence
        </h1>
        <h2 className="text-white text-xl md:text-3xl pb-4">
          Create a unique and beautiful blog easily.
        </h2>
        <div>
          <Link
            to="/login"
            title=""
            className="relative inline-flex items-center justify-center w-auto px-12 py-4 my-2 text-base md:text-lg font-mono text-white bg-black border border-transparent rounded-full animate-pulse"
            role="button"
          >
            Create Your Blog
          </Link>
        </div>
        <div
          className={`transition-opacity duration-6000 ease-in-out ${
            activeSlide === 1 ? "opacity-100" : "opacity-0"
          } inset-0`}
        >
          <div className={`parallax1`}>
            <img
              src="/AM5.1.png"
              className="w-80 left-[-60px] animate-moveUp"
              id="AM5.1"
            ></img>
            <img
              src="/AM5.2.png"
              className="w-40 bottom-[-50px] left-4 animate-moveUp"
              id="AM5.2"
            ></img>
            <img
              src="/AM5.3.png"
              className="w-40 bottom-[-58px] left-48 animate-moveUp"
              id="AM5.3"
            ></img>
            <img
              src="/AM5.4.png"
              className="w-60 right-[-50px] animate-moveUp"
              id="AM5.4"
            ></img>
            <img
              src="/AM5.5.png"
              className="w-40 right-20 bottom-48 animate-moveUp"
              id="AM5.5"
            ></img>
            <img
              src="/AM5.6.png"
              className="w-0 md:w-56 right-12 bottom-[-58px] animate-moveUp"
              id="AM5.6"
            ></img>
            <img
              src="/AM5.main.png"
              className="bottom-0 w-0 md:w-1/2 left-[26%] animate-moveUp "
              id="AM5.main"
            ></img>
          </div>
        </div>

        <div
          className={`transition-opacity duration-6000 ease-in-out ${
            activeSlide === 2 ? "opacity-100" : "opacity-0"
          }  inset-0`}
        >
          <div className="parallax1">
            <img
              src="/AM1.1.png"
              className="w-80 right-[-60px] animate-moveUp"
              id="AM5.1"
            ></img>
            <img
              src="/AM1.2.png"
              className="w-48 bottom-72 left-[-30px] animate-moveUp"
              id="AM5.2"
            ></img>
            <img
              src="/AM1.3.png"
              className="w-36 bottom-40 left-[-20px] animate-moveUp "
              id="AM5.3"
            ></img>
            <img
              src="/AM1.7.png"
              className="w-32 bottom-44 right-32  animate-moveUp"
              id="AM5.7"
            ></img>
            <img
              src="/AM1.4.png"
              className="w-56 md:w-72 left-[-40px] bottom-[-80px] animate-moveUp"
              id="AM5.4"
            ></img>
            <img
              src="/AM1.5.png"
              className="w-20 left-48 bottom-72 animate-moveUp"
              id="AM5.5"
            ></img>
            <img
              src="/AM1.6.png"
              className="w-56 md:w-72 right-[-30px] bottom-[-100px] animate-moveUp"
              id="AM5.6"
            ></img>
            <img
              src="/AM1.main.png"
              className="bottom-0 w-0 md:w-1/2 left-[26%] animate-moveUp "
              id="AM5.main"
            ></img>
          </div>
        </div>
      </section1>

      <div className="h-40% bg-blue-500 z-0 flex flex-col md:flex-row items-center justify-evenly text-white box-shadow-md overflow-clip py-10 md:py-0">
        <div>
          <h1 className="text-5xl font-bold mb-4">
            {" "}
            Choose the perfect design
          </h1>
          <h2 className="text-xl font-light mb-6 max-w-xl">
            Create a beautiful blog that fits your style. Choose from a
            selection of easy-to-use templates – all with flexible layouts and
            hundreds of background images – or design something new.
          </h2>
        </div>
        <BlurFade delay={0.25} inView>
          <div className="relative w-[600px] h-[600px]">
            <img
              src="/AM2.1.png"
              className=" w-96 absolute top-10 left-0 z-2  md:animate-slideInFromRight"
              alt="paint"
            />
            <img
              src="/AM2.2.png"
              className="w-auto absolute bottom-24 left-20 z-3 md:animate-slideInFromRight"
              alt="paint"
            />
            <img
              src="/AM2.3.png"
              className="w-auto absolute bottom-10 left-40 z-4 md:animate-slideInFromRight"
              alt="paint"
            />
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.15} inView>
      <section className="pt-24 pb-96 bg-[rgb(57,140,128)] list-item relative">
        <h1 className=" typing_animation text-3xl md:text-6xl mt-10 pb-4">
        Craft Your Perfect Family Adventure
        </h1>
        <h2 className="text-white text-xl md:text-3xl pb-4">
        Create lasting memories with fun and ease.
        </h2>
        
        
          <div className="parallax1 ">
            <img
              src="/AM4.1.png"
              className="w-72 right-[-60px] bottom-48 "
              id="AM4.1"
            ></img>
            <img
              src="/AM4.2.png"
              className="w-48 bottom-56 left-[-30px] "
              id="AM4.2"
            ></img>
            <img
              src="/AM4.3.png"
              className="w-36 bottom-14 left-56  "
              id="AM5.3"
            ></img>
            <img
              src="/AM4.7.png"
              className="w-32 bottom-44 right-48 "
              id="AM4.7"
            ></img>
            <img
              src="/AM4.4.png"
              className="w-52 md:w-72 left-[-40px] bottom-[-40px] "
              id="AM5.4"
            ></img>
            <img
              src="/AM4.5.png"
              className="w-36 left-48 bottom-72 "
              id="AM5.5"
            ></img>
            <img
              src="/AM4.6.png"
              className="w-32 right-60 bottom-14 "
              id="AM5.6"
            ></img>
            <img
              src="/AM4.8.png"
              className="w-52 md:w-64 right-[-50px] bottom-[-80px] "
              id="AM5.6"
            ></img>
            <img
              src="/AM4.main.png"
              className="bottom-0 w-0 md:w-1/2 left-[26%] "
              id="AM5.main"
            ></img>
          </div>
      </section>
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <div className="flex flex-wrap justify-center gap-10 animate-fade-in-up my-24">
          <div className="text-center p-4 max-w-xs bg-white bg-opacity-20 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <FaRocket className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Fast Performance</h3>
            <p className="text-md">
              Experience lightning-fast speeds with our optimized platform.
            </p>
          </div>
          <div className="text-center p-4 max-w-xs bg-white bg-opacity-20 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <FaSmile className="text-4xl text-yellow-500  mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">User Friendly</h3>
            <p className="text-md">
              Enjoy a seamless and intuitive user interface.
            </p>
          </div>
          <div className="text-center p-4 max-w-xs bg-white bg-opacity-20 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <FaCog className="text-4xl text-green-500  mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Highly Customizable</h3>
            <p className="text-md">
              Tailor our platform to meet your specific needs.
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="h-[50%] relative flex flex-col justify-center items-center py-10 md:pt-0">
        <img
          src="/map.png"
          className="w-full h-full object-cover"
          alt="background"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-xl md:text-5xl font-bold mb-4">
            Join millions of others
          </h1>
          <h2 className="text-base md:text-xl font-light mb-2 md:mb-6 max-w-md md:max-w-xl">
            Whether sharing your expertise, breaking news, or whatever’s on your
            mind, you’re in good company on Blogger. Sign up to discover why
            millions of people have published their passions here.
          </h2>
          <div>
            <Link
              to="/login"
              title=""
              className="relative inline-flex items-center justify-center w-auto px-12 py-4 my-2 text-base md:text-lg font-mono text-white bg-black border border-transparent rounded-full animate-pulse"
              role="button"
            >
              Create Your Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
