import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/modalTypes";

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  location: { type: String },
  avatar: { type: String },
  bio: { type: String },
  blog: { type: String },
  public_repos: { type: Number, default: 0 },
  public_gists: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  follow_details: {
    followers: [{ type: Number }],
    following: [{ type: Number }],
  },
  friends: [{ name: { type: String }, avatar: { type: String } }],
  repos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Repo" }],
  isDeleted: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
