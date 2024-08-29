import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import LandingPage from "../components/LandingPage";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import BlurFade from "../components/UI/BlueFade";

function Home() {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for posts fetching
  const [authLoading, setAuthLoading] = useState(true); // Loading state for auth check
  const user = useSelector((state) => state.auth.user); // Get the current user from the redux store
  const dispatch = useDispatch();

  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setAuthLoading(false); // Stop auth loading
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await appwriteService.getPosts();
        if (postsData) {
          setPosts(postsData.documents);
          setShowPosts(true); // Show posts after fetching
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Stop posts loading
      }
    };

    fetchPosts();
  }, []);

  // Render nothing until authentication status is checked
  if (authLoading) {
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

  // Show loading spinner if posts are not yet ready to display
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
    );
  }

  // If no user is logged in and no posts are available, show the LandingPage
  if (!user && posts.length === 0) {
    return (
      <div className="w-full text-center">
        <LandingPage />
      </div>
    );
  }

  // Show posts if everything is ready
  return (
    <div className="w-full pb-8 pt-40 md:pt-32 bg-[url('/background-picture.jpeg')] bg-cover">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showPosts && posts.map((post) => (
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
