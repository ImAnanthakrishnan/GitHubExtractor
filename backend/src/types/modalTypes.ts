import { Document,ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  location?: string;
  avatar:string;
  bio?: string;
  blog?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  follow_details: {
    followers: ObjectId[];
    following: ObjectId[];
  };
  friends: {
    name: string;
    avatar:string;
  }[];
  repos: ObjectId[];  
  isDeleted: boolean;
}
//////////////////////////////////////////////////////
interface IFollower {
  name: string;
  avatar:string
}

export interface IFollow extends Document {
  userId:ObjectId;
  followers: IFollower[];
  following: IFollower[];
}
////////////////////////////////////////////////////////////

export interface IRepo {
  userId:ObjectId;
  repoName: string;
  description: string;
  topics?: string[]; 
}
