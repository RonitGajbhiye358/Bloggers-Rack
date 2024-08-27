import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [userHasStarred, setUserHasStarred] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.UserID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          if (post.stars && post.stars.includes(userData.$id)) {
            setUserHasStarred(true);
          }
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate, userData]);

  const handleAddStar = async () => {
    if (userHasStarred) return; // Prevent adding another star if already starred

    const newStarArray = post.stars ? [...post.stars, userData.$id] : [userData.$id];
    const updatedPost = await appwriteService.updatePost(post.$id, { stars: newStarArray });

    if (updatedPost) {
      setPost(updatedPost);
      setUserHasStarred(true);
    }
  };

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.Image);
        navigate("/");
      }
    });
  };

  const renderStars = () => {
    const totalStars = post.stars ? post.stars.length : 0;
    return (
      <div className="flex justify-center">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className="text-yellow-500 text-4xl">★</span>
        ))}
        {[...Array(5 - totalStars)].map((_, index) => (
          <span key={index} className="text-gray-300 text-4xl">☆</span>
        ))}
      </div>
    );
  };

  return post ? (
    <div className="pt-36 md:pt-28 pb-8 bg-[url('/background-picture.jpeg')]">
      <Container>
        <div className=" p-5 rounded-lg">
          <div className="w-auto flex h-[60vh] justify-center mb-4 relative rounded-md p-2">
            <img
              src={appwriteService.getFilePreview(post.Image)}
              alt={post.Title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold text-center">{post.Title}</h1>
            <div className="text-center my- 4">
              {renderStars()}
              {!userHasStarred && (
                <Button bgColor="bg-yellow-500" onClick={handleAddStar}>Add Star</Button>
              )}
              {userHasStarred && (
                <p className="text-yellow-500">You have already added a star!</p>
              )}
            </div>
          </div>
          <div className="browser-css text-center">
            {typeof post.Content === "string" ? parse(post.Content) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
