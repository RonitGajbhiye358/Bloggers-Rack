import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function PostCard({ $id, Title, Image, $updatedAt, stars = [], ...post }) {
  const userData = useSelector((state) => state.auth.userData);

  const handleClick = (e) => {
    alert("You cannot access the Private Content of other users!");
  };

  const date = new Date($updatedAt);
  const formattedDateTime = format(date, "dd-MM-yyyy HH:mm a");

  if (userData.$id !== post.UserID && post.Status === "Private") {
    return (
      <Link
        to={`/`}
        onClick={handleClick}
        className="block rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105"
      >
        <div className="relative">
          <img
            src="privatePost.png"
            loading="lazy"
            alt={Title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <h2 className="text-white text-3xl font-semibold">Private Post</h2>
          </div>
        </div>
        <div className="p-4 bg-gray-800 text-center text-white">
          <p>Not accessible...</p>
        </div>
      </Link>
    );
  }

  const totalStars = stars.length;

  return (
    <Link
      to={`/post/${$id}`}
      className="block rounded-lg overflow-hidden shadow-xl transform transition-transform hover:scale-105"
    >
      <div className="relative">
        <img
          src={appwriteService.getFilePreview(Image)}
          loading="lazy"
          alt={Title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <p className="text-white bg-black bg-opacity-50 rounded-full px-2 py-1 text-xs">Updated on {formattedDateTime}</p>
          <div className="flex items-center space-x-1">
            {[...Array(totalStars)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-2xl">★</span>
            ))}
            {[...Array(5 - totalStars)].map((_, index) => (
              <span key={index} className="text-white text-2xl">☆</span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{Title}</h2>
        <p className="text-gray-600 hover:text-gray-400">Explore More...</p>
      </div>
    </Link>
  );
}

export default PostCard;
