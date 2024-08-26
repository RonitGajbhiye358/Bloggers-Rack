import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import LandingPage from "../components/LandingPage";
import BlurFade from "../components/UI/BlueFade";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice"; // Assuming you have these actions in your redux slice

function Home() {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get the current user from the redux store
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        // Simulate a delay before showing posts
        setTimeout(() => {
          setShowPosts(true);
        }, 2000); // 2 seconds delay
      }
    });
  }, []);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  if (!user) {
    return (
      <div className="w-full text-center">
        <LandingPage />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <LandingPage />
      </div>
    );
  }

  if (!showPosts) {
    return (
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

  return (
    <div className="w-full pb-8 pt-32 md:pt-40 bg-[url('/background-picture.jpeg')]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <BlurFade key={post.$id} delay={0.25} inView>
                <PostCard {...post} />
              </BlurFade>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
