import asyncHandler from "express-async-handler";
import { Handler, Request, Response } from "express";
import User from "../../models/userModel";

export const getAllSortedUser = asyncHandler(
  async (req: Request, res: Response) => {

    const {field} = req.query;

    if (!field) {
        res.status(400).json({
          message: "Bad Request",
        });
        return; // if query param not present
      }

      const users = await User.aggregate([
        {
            $match:{isDeleted:false}
        },
        {
            $sort:{field:-1}
        }
      ]);
      
      if(!users){
        res.status(404).json({ message: 'User not found' });
        return;      
      }

      res.status(200).json({
        message:'Success',
        users
      })

  }
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

      const user = await User.findOneAndUpdate(
        {username},
        {isDeleted:true},
        {new:true}
      ) //changing status of delete for soft delete

      if(!user){
       res.status(404).json({ message: 'User not found' });
       return;
      }

      res.json({ message: 'User soft deleted', user });

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

//////////////////////////////////////////////////////////////////////
const updateUser = asyncHandler(
    async(req:Request,res:Response) => {
        const {username} = req.params;
        const {bio,blog,location} = req.body;

        if (!bio || !blog || !location || !username) {
            res.status(400).json({
              message: "Bad Request",
            });
            return; // data unavilable
        }

        const updatedUser = await User.findOneAndUpdate(
            {username},
            {location,blog,bio},
            {new:true}
        ); 

        if(!updateUser){
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.status(200).json({
            message:'Success',
            updateUser
        });
    }
)