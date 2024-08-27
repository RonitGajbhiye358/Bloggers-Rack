import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import LandingPage from "../components/LandingPage";
import BlurFade from "../components/UI/BlueFade";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [loading, setLoading] = useState(true); // New state to manage the loading state
  const user = useSelector((state) => state.auth.user); // Get the current user from the redux store
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
      setLoading(false); // Stop loading after checking user status
    });
  }, [dispatch]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        // Simulate a delay before showing posts
        setTimeout(() => {
          setShowPosts(true);
        }, 200); // 0.2 seconds delay
      }
    });
  }, []);

  // Render nothing until the user authentication status is determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[url('/background-picture.jpeg')] bg-cover">
        <div className="text-center text-black">
          <div className="loader animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-black mx-auto"></div>
          <h2 className="mt-8 text-2xl md:text-4xl font-semibold animate-pulse">
            Loading...
          </h2>
        </div>
      </div>
    ); // Or a loading spinner if you prefer
  }

  // If no user is logged in and no posts are available, show the LandingPage
  if (!user && posts.length === 0) {
    return (
      <div className="w-full text-center">
        <LandingPage />
      </div>
    );
  }

  // Show loading spinner if posts are not yet ready to display
  if (!showPosts) {
    return (
      <div className="flex items-center justify-center h-screen bg-[url('/background-picture.jpeg')] bg-cover">
        <div className="text-center text-black">
          <div className="loader animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-black mx-auto"></div>
          <h2 className="mt-8 text-2xl md:text-4xl font-semibold animate-pulse">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  // Show posts if everything is ready
  return (
    <div className="w-full pb-8 pt-40 md:pt-32 bg-[url('/background-picture.jpeg')] bg-cover">
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
