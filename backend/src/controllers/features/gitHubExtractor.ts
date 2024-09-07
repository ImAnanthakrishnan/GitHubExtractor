import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel";
import { saveUserData } from "../../helpers/features/extractors";
import { getAllUserGitDetails } from "../../helpers/features/detailsGetter";

export const extractGitUserDetails = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params; //fetch data using username

    if (!username) {
      res.status(400).json({
        message: "Bad Request",
      });
      return;
    } //bad request data.

    let gitUserDetails = await User.findOne({ username });
    // if user not existing we need call the api and save it to db
    if (!gitUserDetails) {
      const { message, user } = await saveUserData(username);

      if (user) {
        const gitUserDetails: {} = await getAllUserGitDetails({ username });

        if (!gitUserDetails) {
          res.status(404).json({
            message: "User details not found",
          }); //not found
          return;
        }

        res.status(200).json({
          message: "User found",
          data: gitUserDetails,
        }); //data found
      } else {
        res.status(422).json({
          message: "Unprocessable",
        });
        return;
      }
    } else {
      //if user already present, get all essential data.
      const gitUserDetails: {} = await getAllUserGitDetails({ username });

      if (gitUserDetails) {
        res.status(200).json({
          message: "User found",
          data: gitUserDetails,
        }); //data found
      } else {
        res.status(404).json({
          message: "User details not found",
        }); //not found
      }
    }
  }
);
