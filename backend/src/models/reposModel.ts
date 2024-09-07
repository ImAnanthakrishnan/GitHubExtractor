import mongoose, { Mongoose } from "mongoose";
import { IRepo } from "../types/modalTypes";

const ReposModel = new mongoose.Schema<IRepo>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  repoName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: {
    type: [String],
  },
});

const Repos = mongoose.model("Repo", ReposModel);

export default Repos;
