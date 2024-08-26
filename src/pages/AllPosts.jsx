import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import BlurFade from "../components/UI/BlueFade";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);

        setTimeout(() => {
          setShowPosts(true);
        }, 200); // 0.2 seconds delay
      }
      // Simulate a delay before showing posts
      
    });
  }, []);

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
    <div className="w-full flex  pt-32 md:pt-40 pb-8 bg-[url('/background-picture.jpeg')]">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-full  md:w-1/2 m-auto">
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

export default AllPosts;
