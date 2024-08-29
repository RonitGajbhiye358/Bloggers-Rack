import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    Image,
    status,
    userId,
    allowedFriends,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          Title: title,
          Content: content,
          Image,
          Status: status, // 'public', 'private', 'friends-only'
          UserID: userId,
          AllowedFriends: allowedFriends || [], // List of friend IDs for 'friends-only'
          stars: [],
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  async updatePost(slug, updates) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        updates
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // Send Friend Request
  async sendFriendRequest(senderId, receiverId) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFriendRequestsCollectionId,
        ID.unique(),
        {
          senderId,
          receiverId,
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  }

  // Respond to Friend Request
  // Service.js
  async respondToFriendRequest(requestId, action) {
    try {
      const status = action === "accept" ? "accepted" : "rejected";
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFriendRequestsCollectionId,
        requestId,
        { status }
      );

      if (status === "accepted") {
        const request = await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteFriendRequestsCollectionId,
          requestId
        );

        // Create bi-directional friendship
        await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteFriendsCollectionId,
          ID.unique(),
          { userId: request.senderId, friendId: request.receiverId }
        );
        await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteFriendsCollectionId,
          ID.unique(),
          { userId: request.receiverId, friendId: request.senderId }
        );
      }
    } catch (error) {
      console.error("Error responding to friend request:", error);
    }
  }

  // Get Pending Friend Requests
  async getPendingFriendRequests(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFriendRequestsCollectionId,
        [Query.equal("receiverId", userId), Query.equal("status", "pending")]
      );

      if (response && response.documents) {
        return response;
      } else {
        throw new Error("No documents found or invalid response format");
      }
    } catch (error) {
      console.error("Error fetching pending friend requests:", error);
      throw error;
    }
  }

  async getFriends(userId) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFriendsCollectionId, // Use the defined collection ID
        [Query.equal('userId', userId)]
      );
      return response; // Ensure this response object has a 'documents' property
    } catch (error) {
      console.error('Error fetching friends:', error);
      return { documents: [] }; // Return an empty array if there’s an error
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async incrementStarCount(postId, userId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );

      if (post.ratedByUsers.includes(userId)) {
        console.log("User has already rated this post.");
        return post;
      }

      const updatedStars = [...post.stars, userId];
      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          stars: updatedStars,
          ratedByUsers: [...post.ratedByUsers, userId],
        }
      );
      return updatedPost;
    } catch (error) {
      console.error("Error updating star count:", error);
      return null;
    }
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
        // queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
