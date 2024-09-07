import User from "../../models/userModel"

export const getAllUserGitDetails = async(query:{}) => {
    try{
        //get all details 
        const data = await User.aggregate([
            {$match:query}, //matched doc using username
            { //repos lookup
                $lookup:{
                    from:'repos',
                    localField:'repos',
                    foreignField:'_id',
                    as:'reposDetails'
                },
            },
            {//followers lookup
                $lookup:{
                    from:'follows',
                    localField:'follow_details.followers',
                    foreignField:'followers.id',
                    as:'followersDetails'
                }
            },
            {//following lookup
                $lookup:{
                    from:'follows',
                    localField:'follow_details.following',
                    foreignField:'following.id',
                    as:'followingDetails'                   
                }
            },
            {//projection
                $project:{
                    username: 1,
                    location: 1,
                    avatar: 1,
                    bio: 1,
                    blog: 1,
                    public_repos: 1,
                    public_gists: 1,
                    followers: 1,
                    following: 1,
                    created_at: 1,
                    follow_details:{
                        followers:'$followersDetails.followers',
                        following:'$followingDetails.following'
                    },
                    friends:1,
                    repos:'$reposDetails',
                    isDeleted:1                    
                }
            }
        ]);

        if(data.length === 0){
            throw new Error('User not found');
        }

        return data[0];

    } catch(error:any){
        throw new Error('Failed to fetch user details: ' + error.message);
    }
}