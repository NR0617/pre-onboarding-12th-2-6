import React, { useEffect, useState, useRef } from 'react';
import { getRepoIssue } from 'utils/octokit';
import IssueItem from 'components/RepoListPage/IssueItem';
import Spinner from 'components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RepoListPage = () => {
  const navigate = useNavigate();
  const navigateToDetailPage = (issueNumber): void => {
    navigate(`/detail?number=${issueNumber}`);
  };

  const ITEMS_BEFORE_AD = 4;
  const [isLodingData, setIsLodingData] = useState(true);
  const [issueDataArray, setIssueDataArray] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const ARRAY_SIZE = 15;
  useEffect(() => {
    if (!isLodingData) setIsLodingData(true);
    if (issueDataArray.length % ARRAY_SIZE !== 0) {
      setIsLodingData(false);
      return;
    }
    getRepoIssue(pageNumber)
      .then((res) => {
        setIsLodingData(false);
        if (res.length !== 0) setIssueDataArray((prev) => [...prev, ...res]);
      })
      .catch((error) => {
        navigate(error);
      });
  }, [pageNumber]);

  const observerRef = useRef<HTMLDivElement>(null);
  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      setPageNumber((prev) => prev + 1);
      observer.unobserve(entries[0].target);
    }
  };
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options); // 관찰자 초기화
    if (observerRef.current) {
      observer.observe(observerRef.current); // 관찰할 대상(요소) 등록
    }

    return () => {
      observer.disconnect();
    };
  }, [issueDataArray]);

  return (
    <div>
      <div>
        {issueDataArray.map((item, idx) => {
          return (
            <div key={item.id}>
              {idx !== 0 && idx % ITEMS_BEFORE_AD === 0 && <AdComponent />}
              <IssueItem
                onClick={() => {
                  navigateToDetailPage(item.number);
                }}
                issueNumber={item.number}
                issueTitle={item.title}
                username={item.user.login}
                createdAt={item.created_at}
                commentCount={item.comments}
              />
              {idx === issueDataArray.length - 1 && (
                <div style={{ visibility: 'hidden' }} ref={observerRef}>
                  observer
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isLodingData && <Spinner />}
    </div>
  );
};

export default RepoListPage;

const AdComponent = () => {
  return (
    <AdBanner>
      <a href="https://www.wanted.co.kr/" target="_blank" rel="noreferrer">
        <img
          alt=""
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
        />
      </a>
    </AdBanner>
  );
};

const AdBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
