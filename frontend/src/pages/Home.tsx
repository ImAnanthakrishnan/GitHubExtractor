import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import RepositoryList from "../components/RepositoryList";
import UserDetails from "../components/UserDetails";
import useFetch from "../hooks/useFetch";
import { useAppSelector } from "../app/hooks";
import RepositoryDetails from "../components/RepositoryDetails";
export type RepoType = {
  repoName:string;
  topics:string[];
  description:string
}
const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [tab,setTab] = useState<string>('list');
  const [repo,setRepo] = useState<RepoType>({
    repoName:'',
    topics:[],
    description:''
  });
  const { data } = useAppSelector((data) => data.gitUser);
  console.log(tab)
  return (
    <section className="container">
      <Input setUsername={setUsername} username={username} />
      {data.username && (
        <>
          <UserDetails />
          { tab === "list" ?
          <RepositoryList setRepo={setRepo} setTab={setTab}/>
          :
          <RepositoryDetails repo={repo} setTab={setTab}/>
          }
        </>
      )}
    </section>
  );
};

export default Home;
