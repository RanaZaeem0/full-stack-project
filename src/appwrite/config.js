import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Servies {
  Client = new Client();
  Databases; 
  bucket;
  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl).setProject(
      conf.appwriteProjectId
    );
    this.Databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.Databases.createDocument(
        conf.appwriteDatabaseId,
        console.log(this.Client),
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwriiite serives:: createPost Error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite :: upadetePost", error);
    }
  }
  async deletePost(slug) {
    try {
       await this.Databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite :: Deletepost", error);
      return false;
    }
  }
  async getPost(slug){
    try {
        return await this.Databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log(
            "appwrite :: getpost" ,error
        );
    }
    return false
  }
//  go to your apweite accounnt{in artilce} cheack the index value in worth b\y m\y self 
  async getPosts(queries = [Query.equal("status","active")]){
try {
    return await this.Databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
        100,
        0
    )
} catch (error) {
    console.log("apwrite:: getpost" ,error);
}
}

async updateFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(
            "appWrite  :: updateFile :: error" ,error
        );
        return false
    }
}

async deleteFile (fileId){
    try {
await  this.bucket.deleteFile(
    conf.appwriteBucketId,
    fileId
 )  
  return true
    } catch (error) {
        console.log(
            "appWrite :: deleteFile" ,error
        );
        return false
    }
}

getFilePreview(fileId){
  return this.bucket.getFilePreview(
    conf.appwriteBucketId,
    fileId
  )
}













}

const servies = new Servies();

export default servies;
