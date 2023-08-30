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
  return (
    <ItemContainer onClick={onClick}>
      <div>{issueId}</div>
      <div>{issueTitle}</div>
      <div>{username}</div>
      <div>{createdAt}</div>
      <div>{commentCount}</div>
    </ItemContainer>
  );
};

export default IssueItem;

const ItemContainer = styled.div`
  border: 1px solid red;
`;
