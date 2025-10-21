// import { useState } from 'react';
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router";

import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import TopicView from "./components/TopicView/TopicView";
import CreateTopic from "./components/CreateTopic/AlterTopic";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/topic/:topicName" element={<TopicView />} />
          <Route path="/alterTopic" element={<CreateTopic />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
