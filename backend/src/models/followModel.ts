import mongoose, { Mongoose, Schema } from "mongoose";
import { IFollow } from "../types/modalTypes";

const FollowSchema = new Schema<IFollow>({
  followers: [
    {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      avatar_url: {
        type: String,
        requried: true,
      },
      repos: {
        type: String,
        required:true,
      },
    },
  ],
  following: [
    {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      avatar_url: {
        type: String,
        requried: true,
      },
      repos: {
        type: String,
        required:true,
      },
    },
  ],
});

const Follow = mongoose.model("Follow",FollowSchema);
export default Follow;