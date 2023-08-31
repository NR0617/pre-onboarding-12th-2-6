import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callIssueDetail } from 'utils/octokit';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface DetailData {
  html: string;
  itemNumber: number;
  itemTitle: string;
  username: string;
  createdAt: string;
  commentCount: number;
  userProfileImage: string;
}

const RepoItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const issueNumber = query.get('number');

  const [pageDetailData, setPageDetailData] = useState<DetailData>({
    html: '',
    itemNumber: NaN,
    itemTitle: '',
    username: '',
    createdAt: '',
    commentCount: NaN,
    userProfileImage: '',
  });
  useEffect(() => {
    if (issueNumber === null) navigate('/');
    callIssueDetail(issueNumber)
      .then((res) => {
        console.log(res);
        const data = {
          html: res.body,
          itemNumber: res.number,
          itemTitle: res.title,
          username: res.user.login,
          createdAt: res.created_at,
          commentCount: res.comments,
          userProfileImage: res.user.avatar_url,
        };
        setPageDetailData({ ...data });
      })
      .catch(() => {});
  }, [issueNumber]);

  return (
    <div>
      <p>RepoItemPage</p>
      <img src={pageDetailData.userProfileImage} alt="" />
      <span>{pageDetailData.username}</span>
      <span>{pageDetailData.itemNumber}</span>
      <span>{pageDetailData.itemTitle}</span>
      <span>{pageDetailData.createdAt}</span>
      <span>{pageDetailData.commentCount}</span>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageDetailData?.html}</ReactMarkdown>
    </div>
  );
};

export default RepoItemPage;
