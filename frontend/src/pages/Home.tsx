import { useState } from "react";
import Input from "../components/Input";
import RepositoryList from "../components/RepositoryList";
import UserDetails from "../components/UserDetails";
import { useAppSelector } from "../app/hooks";
import RepositoryDetails from "../components/RepositoryDetails";
import FollowerModal from "../components/modals/FollowModal";
import { Repo } from "../slices/gitUserDetailsSlice";
export type RepoType = {
  repoName: string;
  topics: string[];
  description: string;
};
const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [tab, setTab] = useState<string>("list");
  const [follow, setFollow] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [followData, setFollowData] = useState<Repo[]>([]);
  const [repo, setRepo] = useState<RepoType>({
    repoName: "",
    topics: [],
    description: "",
  });
  const { data } = useAppSelector((data) => data.gitUser);

  return (
    <section className="container">
      <h1 className="heading">GitHubExtractor</h1>
      <Input setUsername={setUsername} username={username} />
      {data.username && !follow ? (
        <>
          <UserDetails setShow={setShow} setStatus={setStatus} />
          {tab === "list" ? (
            <>
              <h2 className="heading">Repositories</h2>
              <RepositoryList setRepo={setRepo} setTab={setTab} />
            </>
          ) : (
            <RepositoryDetails repo={repo} setTab={setTab} />
          )}
        </>
      ) : follow ? (
        <RepositoryList
          follow={follow}
          followData={followData}
          setFollow={setFollow}
        />
      ) : (
        <></>
      )}
      <FollowerModal
        follow={
          status === "followers"
            ? data.follow_details.followers.flat()
            : data.follow_details.following.flat()
        }
        setShow={setShow}
        show={show}
        setFollow={setFollow}
        setFollowData={setFollowData}
      />
    </section>
  );
};

export default Home;
