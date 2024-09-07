import React from "react";
import { useAppSelector } from "../app/hooks";
import { RepoType } from "../pages/Home";
import { FaArrowLeftLong } from "react-icons/fa6";

const RepositoryDetails = ({
  repo,
  setTab,
}: {
  repo: RepoType;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useAppSelector((data) => data.gitUser);
  const sampleTopic = ["Code review", "IDEs", "Free", "Paid"];
  return (
    <section className="repo-details">
      <div className="redirect" onClick={() => setTab("list")}>
        <FaArrowLeftLong size={30} /> <h2>Repository Details</h2>
      </div>
      <div className="details">
        <div className="details-left">
          <img src={data.avatar} alt="" />
          <p>Verified by GitHub</p>
          <h5>Categories</h5>
          <div className="topic-container">
            {repo.topics && repo.topics.length > 0
              ? repo.topics.map((topic, index) => (
                  <div key={index} className="small-topic">
                    {topic}
                  </div>
                ))
              : sampleTopic.map((topic, index) => (
                  <div key={index} className="small-topic">
                    {topic}
                  </div>
                ))}
          </div>
        </div>
        <div className="details-right">
          <h5>Application</h5>
          <h2>{repo.repoName}</h2>
          <button>Set up a plan</button>
          <p>{repo.description}</p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(RepositoryDetails);
