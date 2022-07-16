import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserAuth from './auth/UserAuth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Create from './pages/Create';
import NavBar from './components/NavBar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ProfileEdit from './pages/ProfileEdit';
import ProfileAuth from './components/profile/ProfileAuth';
import RequireAuth from './auth/RequireAuth';
import Blogs from './pages/Blogs';

function App() {
  const [toggleSide, setToggleSide] = useState(true);
  const [toggleSideS, setToggleSideS] = useState(true);
  const toggler = {
    toggleSide: toggleSide,
    setToggleSide: setToggleSide,
    toggleSideS: toggleSideS,
    setToggleSideS: setToggleSideS,
  };
  return (
    <UserAuth>
      <NavBar toggler={toggler} />
      <Signin toggler={toggler} />
      <Signup toggler={toggler} />
      <Routes>
        <Route path="/" element={<Home toggler={toggler} />} exact />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Create />
            </RequireAuth>
          }
        />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route
          path="/profileauth"
          element={<ProfileAuth toggler={toggler} />}
        />
        <Route path="/blogs/:id" element={<Blogs />} />
      </Routes>
    </UserAuth>
  );
}

export default App;
