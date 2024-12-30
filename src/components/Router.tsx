import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import Posts from 'pages/Posts';
import Detail from 'pages/Posts/Detail';
import New from 'pages/Posts/New';
import Edit from 'pages/Posts/Edit';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Layout from 'Layout/Layout';

export function AuthorizedView() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Detail />} />
        <Route path="posts/new" element={<New />} />
        <Route path="posts/edit/:id" element={<Edit />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
}

export function GuestView() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
