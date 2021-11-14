import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Scheduling from "./pages/Scheduling/scheduling";
import Schedules from "./pages/Schedules/schedules";
import Rating from "./pages/Rating/rating"
import NotFound from "./pages/404";

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/scheduling/:id" element={<Scheduling />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/rating" element={<Rating />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
