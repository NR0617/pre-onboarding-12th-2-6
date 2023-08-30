import { Octokit } from 'octokit';

const token = process.env.REACT_APP_GITHUB_TOKEN;
export const octokit = new Octokit({
  auth: token,
});
export const callRepoIssue = async (pagenum) => {
  const result = await octokit.request(`GET /repos/{owner}/{repo}/issues?per_page=15&page=${pagenum}`, {
    owner: 'facebook',
    repo: 'react',
  });
  console.log(result.data);
  return result.data;
};

export const callIssueDetail = async (issueId) => {
  const result = await octokit.request(`GET /repos/{owner}/{repo}/issues/${issueId}`, {
    owner: 'facebook',
    repo: 'react',
  });
  console.log(result);
  return result.data;
};
