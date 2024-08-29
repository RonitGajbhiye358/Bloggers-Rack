import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
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
          <span key={index} className="text-yellow-500 text-4xl">★</span>
        ))}
        {[...Array(5 - totalStars)].map((_, index) => (
          <span key={index} className="text-gray-300 text-4xl">☆</span>
        ))}
      </div>
    );
  };

  return post ? (
    <div className="pt-36 md:pt-28 pb-8 bg-[url('/background-picture.jpeg')] bg-cover">
      <Container>
        <div className="p-5 rounded-lg">
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
            <div className="text-center my-4">
              {renderStars()}
              {!userHasStarred && (
                <Button bgColor="bg-yellow-500" onClick={handleAddStar}>Add Star</Button>
              )}
              {userHasStarred && (
                <p className="text-yellow-500">You have already added a star!</p>
              )}
            </div>
            {!isAuthor && !isFriend && !friendRequestSent && (
              <Button bgColor="bg-blue-500" onClick={handleSendFriendRequest}>
                Send Friend Request
              </Button>
            )}
            {friendRequestSent && (
              <p className="text-blue-500">Friend request sent!</p>
            )}
            {isFriend && (
              <p className="text-green-500">You are friends with the author.</p>
            )}
          </div>
          <div className="browser-css text-center">
            {typeof post.Content === "string" ? parse(post.Content) : null}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
