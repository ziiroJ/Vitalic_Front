import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import IntroPage from "./components/IntroPage";
import CalendarPage from "./components/CalendarPage";
import HomePage from "./components/HomePage";
import GoalPage from "./components/GoalPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/goal" element={<GoalPage />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
