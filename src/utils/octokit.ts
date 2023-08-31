import { Octokit } from 'octokit';

const REQUEST_ISSUE = 'GET /repos/{owner}/{repo}/issues?per_page=15&page=';

export const octokit = new Octokit({});
export const getRepoIssue = async (pagenum) => {
  try {
    const result = await octokit.request(REQUEST_ISSUE + pagenum, {
      owner: 'facebook',
      repo: 'react',
      state: 'open',
      sort: 'comments',
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

const REQUEST_DETAIL = 'GET /repos/{owner}/{repo}/issues/';
export const getIssueDetail = async (issueId) => {
  try {
    const result = await octokit.request(REQUEST_DETAIL + issueId, {
      owner: 'facebook',
      repo: 'react',
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};
