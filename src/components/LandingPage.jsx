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
    <section className="relative text-black">
      <section1 className="pt-44 md:pt-32 relative h-[95vh] md:h-[120vh] list-item overflow-hidden bg-[url('/background-picture.jpeg')] bg-cover font-Poppins">
        <h1 className="typing_animation font-bold text-black text-xl md:text-6xl mt-0 md:mt-10 pb-4">
          Craft Your Digital Presence
        </h1>
        <h2 className="text-black text-base text-wrap md:text-3xl pb-4">
          Create a unique and beautiful blog easily.
        </h2>
        <div>
          <Link
            to="/login"
            title=""
            className="cursor-pointer relative z-100 inline-flex items-center justify-center w-auto px-12 py-4 my-2 text-base md:text-lg font-mono text-white bg-black border border-transparent rounded-full animate-pulse"
            role="button"
          >
            Create Your Blog
          </Link>
        </div>

        <img
          src="/design.png"
          className="visible md:invisible mx-auto absolute bottom-0 "
        ></img>

        <div
          className={`transition-opacity duration-6000 ease-in-out invisible md:visible ${
            activeSlide === 1 ? "opacity-100" : "opacity-0"
          } inset-0`}
        >
          <div className={`parallax1`}>
            <img
              src="/AM5.1.png"
              className="w-80 left-[-60px] bottom-[254px] animate-moveUp"
              id="AM5.1"
            ></img>
            <img
              src="/AM5.2.png"
              className="w-40 bottom-[-50px] left-4  animate-moveUp"
              id="AM5.2"
            ></img>
            <img
              src="/AM5.3.png"
              className="w-40 bottom-[-58px] left-48 animate-moveUp"
              id="AM5.3"
            ></img>
            <img
              src="/AM5.4.png"
              className="w-60 right-[-50px] bottom-[254px] animate-moveUp"
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
          className={`transition-opacity duration-6000 ease-in-out invisible md:visible ${
            activeSlide === 2 ? "opacity-100" : "opacity-0"
          }  inset-0`}
        >
          <div className="parallax1 red">
            <img
              src="/AM1.1.png"
              className="w-80 right-[-60px] bottom-[254px] animate-moveUp"
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

      <div className="h-40% bg-[linear-gradient(110deg,_#ADABF5_0%,_rgba(255,255,255,0)_99%)] z-0 flex flex-col md:flex-row items-center justify-evenly box-shadow-md overflow-clip pt-10 md:py-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {" "}
            Choose the perfect design
          </h1>
          <h2 className="text-xl md:text-2xl font-light mb-6 max-w-2xl">
            Create a beautiful blog that fits your style. Choose from a
            selection of easy-to-use templates – all with flexible layouts and
            hundreds of background images – or design something new.
          </h2>
        </div>
        <BlurFade delay={0.25} inView>
          <div className="relative w-[500px] h-[400px] md:w-[600px] md:h-[600px] text-pretty">
            <im
              src="/AM2.1.png"
              className={`w-0 md:w-96 absolute top-10 left-0 z-2  `}
              alt="paint"
            />
            <img
              src="/AM2.2.png"
              className={`w-auto absolute bottom-24 left-20 z-3  `}
              alt="paint"
            />
            <img
              src="/AM2.3.png"
              className={`"w-auto absolute bottom-10 left-40 z-4 `}
              alt="paint"
            />
          </div>
        </BlurFade>
      </div>

      <div className="h-40% z-0 flex flex-col md:flex-row items-center justify-evenly  box-shadow-md overflow-clip py-10 md:py-0">
        <BlurFade delay={0.25} inView>
          <div className="relative w-[300px] md:w-[600px]">
            <img
              src="/Content1.png"
              className={`my-10 md:my-20 rounded-2xl `}
            />
          </div>
        </BlurFade>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl mb-4 text-black font-bold">
            {" "}
            Choose the perfect design
          </h1>
          <h2 className="text-xl md:text-2xl font-light mb-6 max-w-xl text-black">
            Create a beautiful blog that fits your style. Choose from a
            selection of easy-to-use templates – all with flexible layouts and
            hundreds of background images – or design something new.
          </h2>
        </div>
      </div>

      <BlurFade delay={0.15} inView>
        <section className="pt-10 md:pt-14 pb-96 bg-gradient-to-r from-[#ABF5F1] to-transparent list-item relative">
          <h1 className=" typing_animation text-black text-wrap text-3xl md:text-6xl mt-0 md:mt-10 pb-4">
            Craft Your Perfect Family Adventure
          </h1>
          <h2 className=" text-xl md:text-3xl pb-4">
            Create lasting memories with fun and ease.
          </h2>
          <div className="parallax1 ">
            <img
              src="/AM4.1.png"
              className="w-44 md:w-72 right-[-60px] bottom-48 animate-moveUpNormal"
              id="AM4.1"
            ></img>
            <img
              src="/AM4.2.png"
              className="w-28 md:w-48 bottom-56 left-[-30px] animate-moveUpNormal"
              id="AM4.2"
            ></img>
            <img
              src="/AM4.3.png"
              className="w-20 md:w-36 bottom-14 left-56 animate-moveUpNormal "
              id="AM5.3"
            ></img>
            <img
              src="/AM4.7.png"
              className="w-16 md:w-32 bottom-44 right-48 animate-moveUpNormal"
              id="AM4.7"
            ></img>
            <img
              src="/AM4.4.png"
              className="w-52 md:w-72 left-[-40px] bottom-[-40px] animate-moveUpNormal"
              id="AM5.4"
            ></img>
            <img
              src="/AM4.5.png"
              className="w-20 md:w-36 left-48 bottom-72 animate-moveUpNormal"
              id="AM5.5"
            ></img>
            <img
              src="/AM4.6.png"
              className="w-16 md:w-32 right-60 bottom-14 animate-moveUpNormal"
              id="AM5.6"
            ></img>
            <img
              src="/AM4.8.png"
              className="w-48 md:w-64 right-[-50px] bottom-[-80px] animate-moveUpNormal"
              id="AM5.6"
            ></img>
            <img
              src="/AM4.main.png"
              className="bottom-0 w-0 md:w-1/2 left-[26%] animate-moveUpNormal"
              id="AM5.main"
            ></img>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={0.25} inView>
        <div className="flex flex-wrap justify-center gap-10 animate-fade-in-up my-24 relative">
          <div className="text-center max-w-sm bg-opacity-20 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform border border-gray-300">
            <div className="bg-gradient-to-r from-[#3842ff] to-transparent h-1"></div>
            <div className="p-4">
              <FaRocket className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Fast Performance</h3>
              <p className="text-md">
                Experience lightning-fast speeds with our optimized platform.
              </p>
            </div>
          </div>
          <div className="text-center max-w-sm  bg-opacity-20 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform border border-gray-300">
            <div className="bg-gradient-to-r from-[#fb21ff] to-transparent h-1"></div>
            <div className="p-4">
              <FaSmile className="text-4xl text-yellow-500  mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">User Friendly</h3>
              <p className="text-md">
                Enjoy a seamless and intuitive user interface.
              </p>
            </div>
          </div>
          <div className="text-center max-w-sm bg-opacity-20 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform border border-gray-300">
            <div className="bg-gradient-to-r from-[#21f0ff] to-transparent h-1"></div>
            <div className="p-4">
              <FaCog className="text-4xl text-green-500  mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Highly Customizable</h3>
              <p className="text-md">
                Tailor our platform to meet your specific needs.
              </p>
            </div>
          </div>
        </div>
      </BlurFade>

      <div className="h-screen md:h-[50%] relative flex flex-col justify-center items-center py-10 md:pt-0">
        <img
          src="/map.png"
          className="w-full h-full object-cover"
          alt="background"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            Join millions of others
          </h1>
          <h2 className="text-xl md:text-3xl font-light mb-2 md:mb-6 max-w-md md:max-w-xl">
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
