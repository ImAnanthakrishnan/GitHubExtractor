import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  username: string;
  location?: string;
  avatar: string;
  bio?: string;
  blog?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  follow_details: {
    followers: number[];
    following: number[];
  };
  friends: {
    name: string;
    avatar: string;
  }[];
  repos: ObjectId[];
  isDeleted: boolean;
}
//////////////////////////////////////////////////////
interface IFollower {
  name: string;
  avatar: string;
  id: ObjectId;
}

export interface IFollow extends Document {
  userId: ObjectId;
  followers: IFollower[];
  following: IFollower[];
}
////////////////////////////////////////////////////////////

export interface IRepo {
  userId: ObjectId;
  repoName: string;
  description: string;
  topics?: string[];
}
