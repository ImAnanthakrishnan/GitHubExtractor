import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Repo {
    _id: string;
    name: string;
    description: string;
    language: string;
    created_at: string;
  }

  export interface FollowDetail {
    _id: string;
    name: string;
    avatar: string;
  }

  interface Friend {
    name: string;
    avatar: string;
  }

  interface InitialState {
    loading:boolean
    error: string | null; 
    data: { 
      username: string;
      location: string;
      avatar: string;
      bio: string;
      blog: string;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      created_at: string;
      follow_details: {
        followers: FollowDetail[];
        following: FollowDetail[];
      };
      friends: Friend[];
      repos: Repo[];
      isDeleted: boolean;
    };
  }

  const initialState: InitialState = {
   loading:false,
    error: null,
  
    data: {
      username: '',           
      location: '',           
      avatar: '',              
      bio: '',                 
      blog: '',              
      public_repos: 0,         
      public_gists: 0,         
      followers: 0,            
      following: 0,           
      created_at: '',          
      follow_details: {
        followers: [],         
        following: []          
      },
      friends: [],             
      repos: [],               
      isDeleted: false         
    }
  };

const gitUserSlice = createSlice({
    name:'gituser',
    initialState,
    reducers: {
        fetchUserStart(state) {
          state.loading = true;
          state.error = null; 
        },
        fetchUserSuccess(state, action: PayloadAction<InitialState['data']>) {
          state.loading = false;
          state.data = action.payload;
        },
        fetchUserFailed(state, action: PayloadAction<string>) {
          state.loading = false
          state.error = action.payload; 
        },
      }
});

export const {fetchUserStart,fetchUserSuccess,fetchUserFailed} = gitUserSlice.actions;
export default gitUserSlice.reducer;