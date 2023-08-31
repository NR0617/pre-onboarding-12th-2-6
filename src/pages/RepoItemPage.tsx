import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callIssueDetail } from 'utils/octokit';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

const RepoItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const issueNumber = query.get('number');

  const [html, setHtml] = useState('');
  useEffect(() => {
    if (issueNumber === null) navigate('/');
    callIssueDetail(issueNumber)
      .then((res) => {
        setHtml(res.body);
      })
      .catch(() => {});
  }, [issueNumber]);

  return (
    <div>
      <p>RepoItemPage</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{html}</ReactMarkdown>
    </div>
  );
};

export default RepoItemPage;

// { itemId, itemTitle, username, createdAt, commentCount, userProfileImage, itemContent }
