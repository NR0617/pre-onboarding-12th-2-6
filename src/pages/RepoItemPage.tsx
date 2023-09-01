import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIssueDetail } from 'utils/octokit';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import Spinner from 'components/LoadingSpinner';
import { styled } from 'styled-components';

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

  const [isLoading, setIsLoading] = useState(true);

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
    getIssueDetail(issueNumber)
      .then((res) => {
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
      .finally(() => {
        setIsLoading(false);
      });
  }, [issueNumber]);

  const date = new Date(pageDetailData.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <PageWrapper>
          <IssueInfoDiv>
            <UserInfoDiv>
              <ProfileImg src={pageDetailData.userProfileImage} alt="" />
              <UsernameDiv>{pageDetailData.username}</UsernameDiv>
            </UserInfoDiv>
            <IssueDetail>
              <div>{`Issue #${pageDetailData.itemNumber}`}</div>
              <TitleDiv>{pageDetailData.itemTitle}</TitleDiv>
              <div>{`${year}년 ${month}월 ${day} 일`} </div>
              <CommentSize>comments : {pageDetailData.commentCount}</CommentSize>
            </IssueDetail>
          </IssueInfoDiv>
          <div style={{ fontSize: '1.2em' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageDetailData?.html}</ReactMarkdown>
          </div>
        </PageWrapper>
      )}
    </div>
  );
};

export default RepoItemPage;

const PageWrapper = styled.div`
  margin-top: 50px;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 80px;
  height: 100vh;
  box-sizing: border-box;
`;

const UserInfoDiv = styled.div`
  margin-right: 50px;
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
`;

const UsernameDiv = styled.div`
  font-weight: bold;
  text-align: left;
`;

const IssueInfoDiv = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
`;

const IssueDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const CommentSize = styled.div``;
