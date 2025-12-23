import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { getUser, logout } from '../utils/auth';

function StudentDashboard() {
    const user = getUser();
    const [attendance, setAttendance] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAttendance();
        fetchStats();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await api.get('/attendance/student');
            if (response.data.success) {
                setAttendance(response.data.attendance);
            }
        } catch (err) {
            setError('Failed to fetch attendance');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await api.get('/attendance/student/stats');
            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch stats');
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
                    <Link to="/student/dashboard" className="navbar-brand">
                        AttendanceApp
                    </Link>
                    <ul className="navbar-menu">
                        <li>
                            <Link to="/student/dashboard" className="navbar-link active">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/scan" className="navbar-link">
                                Scan QR
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

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-3 mb-xl">
                        <div className="card">
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {stats.totalAttendance}
                            </h3>
                            <p className="text-muted">Total Classes Attended</p>
                        </div>

                        <div className="card">
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {stats.bySubject?.length || 0}
                            </h3>
                            <p className="text-muted">Different Subjects</p>
                        </div>

                        <div className="card text-center">
                            <Link to="/student/scan" className="btn btn-primary btn-lg btn-block">
                                📷 Scan QR Code
                            </Link>
                        </div>
                    </div>
                )}

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Attendance History</h3>
                        <p className="card-description">
                            Your attendance records
                        </p>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading attendance...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-error">{error}</div>
                    ) : attendance.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <h3>No attendance records yet</h3>
                            <p>Scan a QR code to mark your first attendance</p>
                            <Link to="/student/scan" className="btn btn-primary mt-lg">
                                Scan QR Code
                            </Link>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Session</th>
                                        <th>Subject</th>
                                        <th>Teacher</th>
                                        <th>Marked At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((record, index) => (
                                        <tr key={record._id}>
                                            <td>{index + 1}</td>
                                            <td>{record.session?.title || 'N/A'}</td>
                                            <td>{record.session?.subject || 'N/A'}</td>
                                            <td>{record.session?.teacher?.name || 'N/A'}</td>
                                            <td>{formatDate(record.markedAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Subject-wise Stats */}
                {stats?.bySubject && stats.bySubject.length > 0 && (
                    <div className="card mt-xl">
                        <div className="card-header">
                            <h3 className="card-title">Subject-wise Attendance</h3>
                        </div>

                        <div className="grid grid-cols-3">
                            {stats.bySubject.map((subject) => (
                                <div key={subject._id} className="card">
                                    <h4>{subject._id}</h4>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                                        {subject.count} classes
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;
