import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeacherPage from './pages/TeacherPage';
import ModerationPage from './pages/ModerationPage'; // Импорт новой страницы

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher/:id" element={<TeacherPage />} />
          <Route path="/moderation" element={<ModerationPage />} /> {/* Новый маршрут */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
