import React from 'react';
import RepoListPage from 'pages/RepoListPage';
import { Routes, Route, Outlet } from 'react-router-dom';
import NoMatch from 'pages/Nomatch';
import RepoItemPage from 'pages/RepoItemPage';
import 'App.css';

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
        <p>Organization Name / Repository Name</p>
      </div>
      <Outlet />
    </div>
  );
}
