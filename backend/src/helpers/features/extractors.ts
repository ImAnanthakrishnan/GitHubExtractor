import axios from "axios";
import User from "../../models/userModel";
import Repos from "../../models/reposModel";
import mongoose, { ObjectId } from "mongoose";
import Follow from "../../models/followModel";

export const saveUserData = async (username: string) => {
  try {
    let user;
    const { data } = await axios.get(`${process.env.GIT_API}/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    user = new User({
      username: data.login,
      location: data.location,
      avatar: data.avatar_url,
      bio: data.bio,
      blog: data.blog,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: new Date(data.created_at),
      isDeleted: false,
    });

    const respoIds: ObjectId[] = await saveRepos(username, user._id); //saving repo's

    const { followerIds, followingIds, friends } = await saveFollowDetails(
      username,
      user._id
    ); //saved and extracted id

    //all id's updated;
    user.repos = respoIds;
    user.follow_details.followers = followerIds;
    user.follow_details.following = followingIds;
    user.friends = friends; //friends added

    await user.save(); //saved entire data;

    return {
      message: "User data fetched, saved, and updated successfully",
      user,
    };
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to process :" + error.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////
const saveRepos = async (username: string, userId: unknown) => {
  try {
    const { data } = await axios.get(
      `${process.env.GIT_API}/${username}/repos`
    );
    const repoIds: ObjectId[] = await Promise.all(
      data.map(async (repoData: any) => {
        let repo = await Repos.findOne({ repoName: repoData.name, userId }); //checking for duplicate repo in same username
        if (!repo) {
          repo = new Repos({
            userId,
            repoName: repoData.name,
            description: repoData.description || "No description",
            topics: repoData.topics || [],
          });
          await repo.save();
        }
        return repo._id;
      })
    ); // for parallel execution big data can be extracted so need to be effectively updated by properly waiting.

    return repoIds;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to process :" + error.message);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
const saveFollowDetails = async (username: string, userId: unknown) => {
  try {
    const [followers, following] = await Promise.all([
      axios.get(`${process.env.GIT_API}/${username}/followers`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }),
      axios.get(`${process.env.GIT_API}/${username}/following`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }),
    ]);

    let followDocument = await Follow.findOne({ userId });

    if (!followDocument) {
      // If no document exists for this userId,
      followDocument = new Follow({
        userId: userId,
        followers: [],
        following: [],
      });
    }

    //follower data save and extract id;
    const followerIds: number[] = await Promise.all(
      followers.data.map(async (followerData: any) => {
        const existingFollower = followDocument.followers.find(
          (f) => f.name === followerData.login
        );

        if (!existingFollower) {
          followDocument.followers.push({
            name: followerData.login,
            avatar: followerData.avatar_url,
            id: followerData.id,
          });
        }

        return followerData.id;
      })
    );

    //follower data save and extract id;
    const followingIds: number[] = await Promise.all(
      following.data.map(async (followingData: any) => {
        const existingFollowing = followDocument.following.find(
          (f) => f.name === followingData.login
        );

        if (!existingFollowing) {
          followDocument.following.push({
            name: followingData.login,
            avatar: followingData.avatar_url,
            id: followingData.id,
          });
        }

        return followingData.id;
      })
    );
    await followDocument.save(); //saved all data;
    //find friends-------
    const friends = await findFriends(followers.data, following.data);

    return { followerIds, followingIds, friends };
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Failed to process :" + error.message);
  }
};

const findFriends = async (
  followers: { login: string; avatar_url: string }[],
  followings: { login: string; avatar_url: string }[]
) => {
  //lookup for following
  const followingSet = new Set(followings.map((user) => user.login));
  // Filter followers to find mutual

  const mutualFriends = followers
    .filter((follower) => followingSet.has(follower.login))
    .map((f) => ({ name: f.login, avatar: f.avatar_url }));

  return mutualFriends;
};
