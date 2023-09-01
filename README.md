## 어플리케이션 소개
특정 깃헙 레파지토리(Issues react)의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축
<br>
<br>

## 프로젝트 실행 방법
```
git clone https://github.com/NR0617/pre-onboarding-12th-2-6.git

npm install
npm start
```
<br>
<br>

## 폴더 구조
```
📦 
├─ README.md
├─ public
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ LoadingSpinner.ts
│  │  └─ RepoListPage
│  │     └─ IssueItem.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ Nomatch.tsx
│  │  ├─ RepoItemPage.tsx
│  │  └─ RepoListPage.tsx
│  └─ utils
│     └─ octokit.ts
└─ tsconfig.json
```
<br>
<br>

## 기능 구현

### 무한 스크롤 구현 

1. Intersection Observer를 이용하여 페이지 하단 엘리먼트를 관찰합니다.

```js
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options); // 관찰자 초기화
    if (observerRef.current) {
      observer.observe(observerRef.current); // 관찰할 대상(요소) 등록
    }

    return () => {
      observer.disconnect();
    };
  }, [issueDataArray]);
  

return(
 <div>
 {/*...생략 */}
  {idx === issueDataArray.length - 1 && (
                <div style={{ visibility: 'hidden' }} ref={observerRef}>
                  observer
                </div>
              )}
 </div>
)
```

2. 콜백 함수가 실행될 때 페이지 넘버가 1 증가하고 증가한 페이지의 데이터를 서버에 요청합니다.

```js
  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      setPageNumber((prev) => prev + 1);
      observer.unobserve(entries[0].target);
    }
  };
  useEffect(() => {
    if (!isLodingData) setIsLodingData(true);

    callRepoIssue(pageNumber)
      .then((res) => {
        setIsLodingData(false);
        setIssueDataArray((prev) => [...prev, ...res]);
      })
      .catch(() => {
        navigate('error');
      });
  }, [pageNumber]);

```
<hr>

### 마크다운 파싱 라이브러리와 디테일 페이지 구현

1. marked 라이브러리에서 'dangerouslySetInnerHTML'의 문제가 우려되어 react-markdown으로 변경했습니다.
```js
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageDetailData?.html}</ReactMarkdown>
        </>
      )}
    </div>
  );
```

2. 리스트 페이지에서 아이템을 클릭했을 때 페이지의 이슈번호를 쿼리 스트링으로 제공하고, 디테일 페이지에서 이슈번호를 이용하여 데이터를 요청하였습니다. 리스트 페이지의 응답에도 디테일 페이지에서 필요한 모든 데이터가 있었지만 해당 데이터를 state로 저장해서 사용할 경우 새로고침을 했을 때 state가 날아가는 문제가 발생합니다. 페이지 데이터의 안전성을 고려하여 서버에 데이터를 요청하는 방법을 선택했습니다

```js

const location = useLocation();
const query = new URLSearchParams(location.search);
const issueNumber = query.get('number');

useEffect(() => {
    if (issueNumber === null) navigate('/');
    callIssueDetail(issueNumber)
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
  ```
  <br>
  <br>

## API 관리
1. Octokit을 사용하여 전체 데이터 요청 함수와 상세 페이지 데이터 요청 함수를 만들었습니다
2. api를 요청하는 url은 변수로 관리했습니다

```javascript
mport { Octokit } from 'octokit';

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

```

