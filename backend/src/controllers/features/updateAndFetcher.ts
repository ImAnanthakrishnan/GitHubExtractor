import asyncHandler from "express-async-handler";
import { Handler, Request, Response } from "express";
import User from "../../models/userModel";
import { getAllUserGitDetails } from "../../helpers/features/detailsGetter";

export const getAllSortedUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { field } = req.query;

    if (!field) {
      res.status(400).json({
        message: "Bad Request",
      });
      return; // if query param not present
    }
    const sortField = field as string;
    const users = await User.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        //repos lookup
        $lookup: {
          from: "repos",
          localField: "repos",
          foreignField: "_id",
          as: "reposDetails",
        },
      },
      {
        //followers lookup
        $lookup: {
          from: "follows",
          localField: "follow_details.followers",
          foreignField: "followers.id",
          as: "followersDetails",
        },
      },
      {
        //following lookup
        $lookup: {
          from: "follows",
          localField: "follow_details.following",
          foreignField: "following.id",
          as: "followingDetails",
        },
      },
      {
        $sort: { [sortField]: -1 },
      },
    ]);

    if (!users) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "Success",
      users,
    });
  }
);

////////////////////////////////////////////////////////////////
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    res.status(400).json({
      message: "Bad Request",
    });
    return; // if route param not present
  }

  const user = await User.findOneAndUpdate(
    { username },
    { isDeleted: true },
    { new: true }
  ); //changing status of delete for soft delete

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ message: "User soft deleted", user });
});

////////////////////////////////////////////////////////////////
export const searchUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, location } = req.query;

  if (!username && !location) {
    res.status(400).json({
      message: "Bad Request",
    });
    return; // if query params not present
  }

  const query = {
    isDeleted: false,
    $or: [
      { username: { $regex: String(username), $options: "i" } },
      { location: { $regex: String(location), $options: "i" } },
    ],
  }; // query for search wit locatin or username and which is not deleted

  const users = await getAllUserGitDetails(query); //details getter;
  if (users) {
    //success
    res.status(200).json({
      message: "Success",
      users,
    });
  } else {
    //failed
    res.status(404).json({
      message: "Not found",
    });
  }
});

//////////////////////////////////////////////////////////////////////
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;
  const { bio, blog, location } = req.body;

  if (!username) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  //  update object dynamically
  const updateFields: any = {};
  if (bio) updateFields.bio = bio;
  if (blog) updateFields.blog = blog;
  if (location) updateFields.location = location;

  if (Object.keys(updateFields).length === 0) {
    res.status(400).json({ message: "No fields to update" });
    return;
  }

  const updatedUser = await User.findOneAndUpdate({ username }, updateFields, {
    new: true,
  });

  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    message: "Success",
    updatedUser,
  });
});
