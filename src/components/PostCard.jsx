import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function PostCard({ $id, Title, Image, $updatedAt, ...post }) {
  const userData = useSelector((state) => state.auth.userData);
  console.log("current user id ", userData);
  console.log("PostCard Id  -", post);
  console.log("PostCard  status -", post.Status);

  const date = new Date($updatedAt);
  // Format to "dd/MM/yyyy HH:mm:ss"
  const formattedDateTime = format(date, "dd-MM-yyyy HH:mm a");

  if (userData.$id !== post.UserID && post.Status === "Private") {
    return (
      <Link
        to={`/`}
        className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 hover:scale-105"
      >
        <div className="relative">
          <img
            src="privatePost.png"
            loading="lazy"
            alt={Title}
            className="w-full h-64 object-cover rounded-lg "
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-red-950 text-2xl font-semibold mt-2 mb-4 group-hover:text-3xl">
            Private Post
          </h2>
          <p className=" text-red-950 hover:font-semibold">Not accessible...</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/post/${$id}`}
      className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 hover:scale-105 group"
    >
      <div className="relative">
        <img
          src={appwriteService.getFilePreview(Image)}
          loading="lazy"
          alt={Title}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <p className="text-gray-950 text-sm group-hover:text-md">Updated on {formattedDateTime}</p>
        <h2 className="text-xl font-bold mt-2 mb-4 group-hover:text-2xl">{Title}</h2>
        <p className=" text-gray-950  group-hover:text-lg">
          Read More...
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
