import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { pagination } from "../utils/main";
import { RepoType } from "../pages/Home";
import { Repo } from "../slices/gitUserDetailsSlice";
import { FaArrowLeftLong } from "react-icons/fa6";

const RepositoryList = ({
  setRepo,
  setTab,
  follow,
  followData,
  setFollow
}: {
  setRepo?: React.Dispatch<React.SetStateAction<RepoType>>;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
  follow?: boolean;
  followData?: Repo[];
  setFollow?:React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useAppSelector((data) => data.gitUser);
  const { currentRepos, totalPages } = pagination(
    follow && followData ? followData : data.repos,
    currentPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="repository-container">
      {follow && (
        <div className="redirect" onClick={() => {setFollow && setFollow(false)}}>
          <FaArrowLeftLong size={30} /> <h2>Repository List</h2>
        </div>
      )}
      <div className="repos">
        {currentRepos.map((repo) => (
          <div
            key={repo._id}
            onClick={
              !follow
                ? () => {
                    setRepo && setRepo(repo);
                    setTab && setTab("details");
                  }
                : undefined
            }
          >
            <h3>{repo.repoName}</h3>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious}>Prev</button>
        <p>
          {currentPage}/{totalPages}
        </p>
        <button onClick={handleNext}>Next</button>
      </div>
    </section>
  );
};

export default RepositoryList;
