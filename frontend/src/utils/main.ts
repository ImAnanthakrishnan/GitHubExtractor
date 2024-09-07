export const pagination = (
  repos: any[],
  currentPage: number
): { currentRepos: any[]; totalPages: number } => {
  const itemsPerPage: number = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentRepos = repos.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

  return {
    currentRepos,
    totalPages,
  };
};
