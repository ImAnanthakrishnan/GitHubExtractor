import React, { useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { pagination } from '../utils/main';
import { RepoType } from '../pages/Home';

const RepositoryList = ({setRepo,setTab}:{setRepo:React.Dispatch<React.SetStateAction<RepoType>>,setTab:React.Dispatch<React.SetStateAction<string>>}) => {
  const [currentPage,setCurrentPage] = useState<number>(1);
  const {data} = useAppSelector(data => data.gitUser);
  const {currentRepos,totalPages} = pagination(data.repos,currentPage);


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <section className='repository-container'>
         <div className='repos'>
        {currentRepos.map((repo) => (
          <div key={repo._id} onClick={() => {setRepo(repo),setTab('details')}}>
            <h3>{repo.repoName}</h3>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
      <div className='pagination'>
        <button onClick={handlePrevious}>Prev</button>
        <p>{currentPage}/{totalPages}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </section>
  )
}

export default RepositoryList
