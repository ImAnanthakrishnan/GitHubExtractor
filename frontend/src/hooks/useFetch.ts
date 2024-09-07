import axios from "axios";
import { useEffect} from "react";
import { BASE_URL } from "../config";
import { useAppDispatch } from "../app/hooks";
import { fetchUserFailed, fetchUserStart, fetchUserSuccess } from "../slices/gitUserDetailsSlice";


const useFetch = (url: string|null) => {
   const dispatch = useAppDispatch();
    useEffect(() => {
      const fetchData = async () => {
        try {
           dispatch(fetchUserStart());
          const result = await axios.get(`${BASE_URL}${url}`);
          const {data} = result.data; 
          dispatch(fetchUserSuccess(data));
        } catch (error: any) {
            dispatch(fetchUserFailed(error.response.data.message));
        }
      };
     
      fetchData();
    }, [url]);
  };
  
  export default useFetch;