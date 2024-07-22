import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Login, PostCard } from "../components";
import LandingPage from "../components/LandingPage";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
     appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <LandingPage />
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
