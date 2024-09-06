import mongoose, { Mongoose, Schema } from "mongoose";
import { IFollow } from "../types/modalTypes";

const FollowSchema = new Schema<IFollow>({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  followers: [
    {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      avatar:{
        type:String,
        required:true
      }
    },
  ],
  following: [
    {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      avatar:{
        type:String,
        required:true
      }
    },
  ],
});

const Follow = mongoose.model("Follow",FollowSchema);
export default Follow;