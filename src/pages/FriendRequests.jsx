import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config"; // Adjust the import path as needed
import { Button, Container } from "../components"; // Ensure these components exist or replace with your own

const FriendRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (userData) {
        try {
          const response = await appwriteService.getPendingFriendRequests(
            userData.$id
          );
          setPendingRequests(response.documents); // Access 'documents' from the response
        } catch (error) {
          console.error("Error fetching pending friend requests:", error);
        }
      }
    };

    fetchPendingRequests();
  }, [userData]);

  const handleRespondToRequest = async (requestId, action) => {
    try {
      await appwriteService.respondToFriendRequest(requestId, action);
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request.$id !== requestId)
      );
    } catch (error) {
      console.error("Error responding to friend request:", error);
    }
  };

  return (
    <div className="pb-20 pt-52 md:pt-32 bg-gray-100 bg-[url('/background-picture.jpeg')] bg-cover">
      <Container>
        <h1 className="text-2xl font-bold text-center mb-6">Friend Requests</h1>
        {pendingRequests.length === 0 ? (
          <p className="text-center">You have no pending friend requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.$id}
                className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
              >
                <p className="text-lg">{`Friend request from User ${request.senderId}`}</p>
                <div className="flex space-x-2">
                  <Button
                    bgColor="bg-green-500"
                    onClick={() =>
                      handleRespondToRequest(request.$id, "accept")
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    bgColor="bg-red-500"
                    onClick={() =>
                      handleRespondToRequest(request.$id, "reject")
                    }
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FriendRequests;
