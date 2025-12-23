import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getUser } from './utils/auth';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import CreateSession from './pages/CreateSession';
import SessionDetails from './pages/SessionDetails';
import StudentDashboard from './pages/StudentDashboard';
import ScanQR from './pages/ScanQR';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const HomeRedirect = () => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }

    const user = getUser();
    if (user?.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-session"
          element={
            <ProtectedRoute requiredRole="teacher">
              <CreateSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/session/:id"
          element={
            <ProtectedRoute requiredRole="teacher">
              <SessionDetails />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/scan"
          element={
            <ProtectedRoute requiredRole="student">
              <ScanQR />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
