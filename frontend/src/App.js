import React, { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "./store";
import { adminActions } from "./store";
import Booking from "./components/Bookings/Booking";


function App() {

  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    }
    else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.adminLogin());
    }
  }
  , [dispatch]);
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
