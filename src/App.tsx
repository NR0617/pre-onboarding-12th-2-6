import React from 'react';
import RepoListPage from 'pages/RepoListPage';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import NoMatch from 'pages/Nomatch';
import RepoItemPage from 'pages/RepoItemPage';
import 'App.css';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from 'utils/octokit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RepoListPage />} />
          <Route path="detail" element={<RepoItemPage />} />
          <Route path="error" element={<NoMatch />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div>
      <div className="header">
        <Link to="/">
          {ORGANIZATION_NAME} / {REPOSITORY_NAME}
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
