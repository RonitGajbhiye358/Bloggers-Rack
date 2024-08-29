import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userHasStarred, setUserHasStarred] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.UserID === userData.$id : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          const fetchedPost = await appwriteService.getPost(slug);
          if (fetchedPost) {
            setPost(fetchedPost);
            setUserHasStarred(fetchedPost.stars && fetchedPost.stars.includes(userData.$id));
            await checkIfFriend(fetchedPost.UserID);
            await checkFriendRequestStatus(fetchedPost.UserID);
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate, userData]);

  const checkIfFriend = async (authorId) => {
    try {
      const friends = await appwriteService.getFriends(userData.$id);
      const isFriend = friends.documents.some(friend => friend.friendId === authorId);
      setIsFriend(isFriend);
    } catch (error) {
      console.error("Error checking friend status:", error);
    }
  };

  const checkFriendRequestStatus = async (authorId) => {
    try {
      const pendingRequests = await appwriteService.getPendingFriendRequests(userData.$id);
      const requestSent = pendingRequests.documents.some(request => request.receiverId === authorId);
      setFriendRequestSent(requestSent);
    } catch (error) {
      console.error("Error checking friend request status:", error);
    }
  };

  const handleAddStar = async () => {
    if (userHasStarred) return; // Prevent adding another star if already starred

    try {
      const newStarArray = post.stars ? [...post.stars, userData.$id] : [userData.$id];
      const updatedPost = await appwriteService.updatePost(post.$id, { stars: newStarArray });
      if (updatedPost) {
        setPost(updatedPost);
        setUserHasStarred(true);
      }
    } catch (error) {
      console.error("Error adding star:", error);
    }
  };

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.Image);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      await appwriteService.sendFriendRequest(userData.$id, post.UserID);
      setFriendRequestSent(true);
      console.log("Friend request sent successfully.");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request. Please try again.");
    }
  };

  const renderStars = () => {
    const totalStars = post.stars ? post.stars.length : 0;
    return (
      <div className="flex justify-center">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-4xl">★</span>
        ))}
        {[...Array(5 - totalStars)].map((_, index) => (
          <span key={index} className="text-gray-300 text-4xl">☆</span>
        ))}
      </div>
    );
  };

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

  return post ? (
    <div className="pt-36 md:pt-28 pb-8 bg-[url('/background-picture.jpeg')] bg-cover">
      <Container>
        <div className="p-5">
          <div className="relative flex justify-center mb-4">
            <img
              src={appwriteService.getFilePreview(post.Image)}
              alt={post.Title}
              className="w-full h-[60vh] object-contain rounded-lg"
            />
            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="text-white">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost} className="text-white">Delete</Button>
              </div>
            )}
          </div>

          <div className="text-center mb-6 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl font-bold mb-4">{post.Title}</h1>
            <div className="mb-4">{renderStars()}</div>
            {!userHasStarred && (
              <Button bgColor="bg-yellow-500" onClick={handleAddStar} className="text-white">Add Star</Button>
            )}
            {userHasStarred && (
              <p className="text-yellow-500 mt-2">You have already added a star!</p>
            )}
            {!isAuthor && !isFriend && !friendRequestSent && (
              <Button bgColor="bg-blue-500" onClick={handleSendFriendRequest} className="text-white">
                Send Friend Request
              </Button>
            )}
            {friendRequestSent && (
              <p className="text-blue-500 mt-2">Friend request sent!</p>
            )}
            {isFriend && (
              <p className="text-green-500 mt-2">You are friends with the author.</p>
            )}
          </div>
          <div className="text-center">
            {typeof post.Content === "string" ? parse(post.Content) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-gray-600">Post not found.</p>
    </div>
  );
}
