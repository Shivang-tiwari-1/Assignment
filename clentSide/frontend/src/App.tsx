import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import PersistentLogin from "./ParsistentLogin/PersistentLogin";
import RequiredAuth from "./components/RecuiredAuth";
import Navbar from "./components/Navbar";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import Home from "./components/User/Home";
import Cart from "./components/User/Crat";

const App: React.FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<Outlet />}>
          {/** Public routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/** Protected routes */}
          <Route element={<PersistentLogin />}>
            <Route element={<RequiredAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
