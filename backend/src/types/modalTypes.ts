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
  follow_details: ObjectId[]; 
  friends:string[]
  repos: ObjectId[];  
  isDeleted: boolean;
}
//////////////////////////////////////////////////////
interface IFollower {
  name: string;
  avatar_url: string;
  repos: string;
}

export interface IFollow extends Document {
  followers: IFollower[];
  following: IFollower[];
}
////////////////////////////////////////////////////////////

export interface IRepo {
  repoName: string;
  description: string;
  topics?: string[]; 
}
