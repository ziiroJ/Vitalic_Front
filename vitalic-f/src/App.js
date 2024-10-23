import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import IntroPage from "./components/IntroPage";
import CalendarPage from "./components/CalendarPage";
import HomePage from "./components/HomePage";
import GoalPage from "./components/GoalPage";
import UserPage from "./components/UserPage";
import AdminPage from "./AdminPage";
import JoinPage from "./components/JoinPage";
import LoginPage from "./components/LoginPage";

function AppContent() {
  const location = useLocation(); // useLocation은 Router 내부에서 사용해야 함

  // 목표 상태를 관리하기 위해 useState 사용
  const [goal, setGoal] = useState({
    year: 0, // 연도 목표
    month: 0, // 월 목표
    day: 0, // 일 목표
  });

  return (
    <div className="app-container">
      <Routes>
        {/* 각 페이지에 대한 라우트 설정 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<IntroPage />} />
        <Route path="/calendar" element={<CalendarPage />} />

        {/* goal 상태를 GoalPage에 전달 */}
        <Route
          path="/goal"
          element={<GoalPage goal={goal} setGoal={setGoal} />}
        />

        {/* setGoal 함수를 UserPage에 전달하여 목표 설정 */}
        <Route path="/user" element={<UserPage setGoal={setGoal} />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* 현재 경로가 인트로, 가입, 로그인, admin 페이지가 아닌 경우에만 NavBar를 렌더링 */}
      {location.pathname !== "/" &&
        location.pathname !== "/admin" &&
        location.pathname !== "/join" &&
        location.pathname !== "/login" && <NavBar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
