import React, { useEffect, useState } from 'react';
import { marked } from 'marked'; // marked 라이브러리 사용
import { useLocation, useNavigate } from 'react-router-dom';
import { callIssueDetail } from 'utils/octokit';

const RepoItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const issueNumber = query.get('number');

  const [html, setHtml] = useState('');
  useEffect(() => {
    if (issueNumber === null) return;
    callIssueDetail(issueNumber)
      .then((res) => {
        const htmlBody = marked(res.body);
        setHtml(htmlBody);
      })
      .catch(() => {
        navigate('/');
      });
  }, [issueNumber]);

  return (
    <div>
      <p>RepoItemPage</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default RepoItemPage;

// { itemId, itemTitle, username, createdAt, commentCount, userProfileImage, itemContent }
