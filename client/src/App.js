import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Landing from "./components/Layout/Landing/Landing";
import UserLanding from "./components/UserScreens/UserLanding/UserLanding";
import UserProfileUpdate from "./components/UserScreens/UserProfileUpdate/UserProfileUpdate";
import Appbar from "./components/Layout/Appbar/Appbar";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./components/Authentication/userLogin/Login";
import Register from "./components/Authentication/userRegister/Register";
import AboutUs from "./components/Layout/AboutUs/AboutUs";
import UserProfile from "./components/UserScreens/UserProfile/UserProfile";
import Error404 from "./components/Layout/Error404/Error404";
import DevProfiles from "./components/UserScreens/DevelopersProfile/DevProfiles";
import DevProfile from "./components/UserScreens/DevProfile/DevProfile";

const App = () => {
  const { User } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route
          exact
          path="/"
          element={User ? <UserLanding /> : <Landing />}
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/aboutus" element={<AboutUs />}></Route>
        <Route
          exact
          path="/my-profile"
          element={User ? <UserProfile /> : <Error404 />}
        ></Route>
        <Route path="/profile/:userId" element={<DevProfile />}></Route>

        <Route
          exact
          path="/update-profile"
          element={User ? <UserProfileUpdate /> : <Error404 />}
        ></Route>
        <Route exact path="/hirenow" element={<DevProfiles />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
