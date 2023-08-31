import React from 'react';
import styled from 'styled-components';

type IssueItemProps = {
  onClick: () => void; // 이 줄을 추가합니다.
  issueId: number;
  issueTitle: string;
  username: string;
  createdAt: string;
  commentCount: number;
};

const IssueItem = ({ onClick, issueId, issueTitle, username, createdAt, commentCount }: IssueItemProps) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <ItemContainer onClick={onClick}>
      <IdDiv>{`Issue #${issueId}`}</IdDiv>
      <TitleDiv>{issueTitle}</TitleDiv>
      <ItemInfoDiv>
        <UsernameDiv>{username}</UsernameDiv>
        <div>
          <div>{`${year}년 ${month}월 ${day} 일`} </div>
          <div>comments : {commentCount}</div>
        </div>
      </ItemInfoDiv>
    </ItemContainer>
  );
};

export default IssueItem;

const ItemContainer = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
`;

const IdDiv = styled.div`
  margin-bottom: 10px;
  color: gray;
  font-weight: bold;
`;
const TitleDiv = styled.div`
  margin-bottom: 10px;
  font-size: 1.3em;
  font-weight: bold;
`;

const UsernameDiv = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;

const ItemInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
