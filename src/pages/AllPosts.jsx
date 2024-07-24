import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import BlurFade from "../components/UI/BlueFade";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full flex py-8">
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
