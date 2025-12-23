import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getUser, logout } from '../utils/auth';

function TeacherDashboard() {
    const navigate = useNavigate();
    const user = getUser();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await api.get('/sessions');
            if (response.data.success) {
                setSessions(response.data.sessions);
            }
        } catch (err) {
            setError('Failed to fetch sessions');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSession = async (sessionId) => {
        if (!window.confirm('Are you sure you want to delete this session?')) {
            return;
        }

        try {
            await api.delete(`/sessions/${sessionId}`);
            setSessions(sessions.filter(s => s._id !== sessionId));
        } catch (err) {
            alert('Failed to delete session');
        }
    };

    const handleToggleSession = async (sessionId) => {
        try {
            const response = await api.put(`/sessions/${sessionId}/toggle`);
            if (response.data.success) {
                setSessions(sessions.map(s =>
                    s._id === sessionId ? response.data.session : s
                ));
            }
        } catch (err) {
            alert('Failed to toggle session status');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/teacher/dashboard" className="navbar-brand">
                        AttendanceApp
                    </Link>
                    <ul className="navbar-menu">
                        <li>
                            <Link to="/teacher/dashboard" className="navbar-link active">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher/create-session" className="navbar-link">
                                Create Session
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className="btn btn-secondary btn-sm">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Welcome, {user?.name}</h1>
                    <p className="dashboard-subtitle">
                        {user?.department} • {user?.college}
                    </p>
                </div>

                <div className="flex justify-between items-center mb-xl">
                    <h2>Your Sessions</h2>
                    <Link to="/teacher/create-session" className="btn btn-primary">
                        + Create New Session
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading sessions...</p>
                    </div>
                ) : error ? (
                    <div className="alert alert-error">{error}</div>
                ) : sessions.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📋</div>
                        <h3>No sessions yet</h3>
                        <p>Create your first attendance session to get started</p>
                        <Link to="/teacher/create-session" className="btn btn-primary mt-lg">
                            Create Session
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2">
                        {sessions.map((session) => (
                            <div key={session._id} className="session-card card fade-in">
                                <div className="session-header">
                                    <div>
                                        <h3 className="session-title">{session.title}</h3>
                                        <p className="session-subject">{session.subject}</p>
                                    </div>
                                    <span className={`session-badge ${session.active ? 'badge-active' : 'badge-inactive'}`}>
                                        {session.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="session-info">
                                    <span>📅 {formatDate(session.date)}</span>
                                    <span>⏱️ {session.duration} min</span>
                                </div>

                                <div className="session-actions">
                                    <Link
                                        to={`/teacher/session/${session._id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleToggleSession(session._id)}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        {session.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSession(session._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherDashboard;
