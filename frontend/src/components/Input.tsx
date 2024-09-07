import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const Input = ({
  setUsername,
  username,
  
}: {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;

}) => {
  const [url, setUrl] = useState<string | null>(null);
  const handleClick = () => {
    if (username.trim()) {
      setUrl(`/user/${username}`);
    }
   
  };
  useFetch(url);
  return (
    <div className="SearchInputContainer">
      <input
        type="search"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Input;
