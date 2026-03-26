import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featured_image, status, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
        data: { title, content, featured_image, status, userId },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featured_image, status }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
        data: { title, content, featured_image, status },
      });
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }

  async getActivePosts(status = true, userId) {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appWriteDatabaseId,
        collectionId: conf.appWriteCollectionId,
        queries: [
          Query.or([
            Query.equal("status", status), // all active posts
            Query.and([
              Query.equal("status", !status),
              Query.equal("userId", userId), // inactive but only current user's
            ]),
          ]),
          Query.orderDesc("$createdAt"),
        ],
      });
    } catch (error) {
      console.error("Error getting active posts:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appWriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appWriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket
      .getFileView(
        conf.appWriteBucketId, // ✅ getFileView — no transformations, works on free plan
        fileId,
      )
      .toString();
  }
}

const service = new Service();
export default service;
