import { Document,ObjectId } from 'mongoose';

export interface IUser extends Document {
  username: string;
  location?: string;
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
  }[];
  repos: ObjectId[];  
  isDeleted: boolean;
}
//////////////////////////////////////////////////////
interface IFollower {
  name: string;
}

export interface IFollow extends Document {
  followers: IFollower[];
  following: IFollower[];
}
////////////////////////////////////////////////////////////

export interface IRepo {
  username:string;
  repoName: string;
  description: string;
  topics?: string[]; 
}
