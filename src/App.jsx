// import { useState } from 'react';
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router";

import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import TopicView from "./components/TopicView/TopicView";
import AlterTopic from "./components/AlterTopic/AlterTopic";
import Login from "./pages/Login/Login";
import History from "./components/History/History";

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
          <Route path="/alterTopic/:topicName" element={<AlterTopic />} />
          <Route path="/history" element={<History/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
