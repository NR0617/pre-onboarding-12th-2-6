import { Octokit } from 'octokit';

export const ORGANIZATION_NAME = 'facebook';
export const REPOSITORY_NAME = 'react';
const REQUEST_ISSUE = 'GET /repos/{owner}/{repo}/issues?per_page=15&page=';

export const octokit = new Octokit({});
export const getRepoIssue = async (pagenum: number) => {
  try {
    const result = await octokit.request(REQUEST_ISSUE + pagenum, {
      owner: ORGANIZATION_NAME,
      repo: REPOSITORY_NAME,
      state: 'open',
      sort: 'comments',
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};

const REQUEST_DETAIL = 'GET /repos/{owner}/{repo}/issues/';
export const getIssueDetail = async (issueId: string) => {
  try {
    const result = await octokit.request(REQUEST_DETAIL + issueId, {
      owner: ORGANIZATION_NAME,
      repo: REPOSITORY_NAME,
    });
    return result.data;
  } catch (error) {
    throw new Error();
  }
};
