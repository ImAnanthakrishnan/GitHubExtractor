import asyncHandler from "express-async-handler";
import { Handler, Request, Response } from "express";
import User from "../../models/userModel";

export const getAllSortedUser = asyncHandler(
  async (req: Request, res: Response) => {}
);

////////////////////////////////////////////////////////////////
export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const {username} = req.params;

    if (!username) {
        res.status(400).json({
          message: "Bad Request",
        });
        return; // if route param not present
      }

      

  }
);


////////////////////////////////////////////////////////////////
export const searchUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, location } = req.query;

  if (!username || !location) {
    res.status(400).json({
      message: "Bad Request",
    });
    return; // if query params not present
  }

  const query = {
    isDeleted: false,
    $or: [
      { username: { $regex: username, $options: "i" } },
      { location: { $regex: location, $options: "i" } },
    ],
  }; // query for search wit locatin or username and which is not deleted

  const users = await User.find(query);

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
