import User from "../../models/userModel.js"

export const getAllUserGitDetails = async(username:string) => {
    try{
        //get all details 
        const data = await User.aggregate([
            {$match:{username}}, //matched doc using username
            { //repos lookup
                $lookup:{
                    from:'Repos',
                    localField:'repos',
                    foreignField:'_id',
                    as:'reposDetails'
                },
            },
            {//followers lookup
                $lookup:{
                    from:'Follows',
                    localField:'follow_details.followers',
                    foreignField:'_id',
                    as:'followersDetails'
                }
            },
            {//following lookup
                $lookup:{
                    from:'Follows',
                    localField:'follow_details.following',
                    foreignField:'_id',
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
                        followers:'$followersDetails',
                        following:'$followingDetails'
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