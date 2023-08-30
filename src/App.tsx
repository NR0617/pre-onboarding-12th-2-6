import React from 'react';
import RepoListPage from 'pages/RepoListPage';
import { Routes, Route, Outlet } from 'react-router-dom';
import NoMatch from 'pages/Nomatch';
import RepoItemPage from 'pages/RepoItemPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RepoListPage />} />
          <Route path="detail" element={<RepoItemPage />} />
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
      <header>Organization Name / Repository Name</header>
      <Outlet />
    </div>
  );
}
