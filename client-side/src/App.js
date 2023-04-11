import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UpdateProfile from "./pages/UpdateProfile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./features/user/userSlice";
import Users from "./pages/Users";

function App() {
  const userToken = localStorage.getItem("user_token");
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(checkLogin(userToken));
  });

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/verification/:token" element={<Verification />} />
        {userGlobal.id > 0 ? (
          <Route path="/users" element={<Users />} />
        ) : (
          <>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
