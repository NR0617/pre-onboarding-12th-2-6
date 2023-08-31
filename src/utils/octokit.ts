import { Octokit } from 'octokit';

const token = process.env.REACT_APP_GITHUB_TOKEN;
export const octokit = new Octokit({
  auth: token,
});
export const callRepoIssue = async (pagenum) => {
  try {
    const result = await octokit.request(`GET /repos/{owner}/{repo}/issues?per_page=15&page=${pagenum}`, {
      owner: 'facebook',
      repo: 'react',
      state: 'open',
      sort: 'comments',
    });
    if (!result || !result.data || result.data.length === 0) throw new Error();
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

export const callIssueDetail = async (issueId) => {
  try {
    const result = await octokit.request(`GET /repos/{owner}/{repo}/issues/${issueId}`, {
      owner: 'facebook',
      repo: 'react',
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};
