import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';

function ProtectedRoute({ children, requiredRole }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
        const user = getUser();
        if (user?.role !== requiredRole) {
            // Redirect to appropriate dashboard based on actual role
            if (user?.role === 'teacher') {
                return <Navigate to="/teacher/dashboard" replace />;
            } else {
                return <Navigate to="/student/dashboard" replace />;
            }
        }
    }

    return children;
}

export default ProtectedRoute;
