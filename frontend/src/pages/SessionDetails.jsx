import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { logout } from '../utils/auth';

function SessionDetails() {
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSessionDetails();
        fetchAttendance();

        // Poll for new attendance every 5 seconds
        const interval = setInterval(fetchAttendance, 5000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchSessionDetails = async () => {
        try {
            const response = await api.get(`/sessions/${id}`);
            if (response.data.success) {
                setSession(response.data.session);
            }
        } catch (err) {
            setError('Failed to fetch session details');
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendance = async () => {
        try {
            const response = await api.get(`/attendance/session/${id}`);
            if (response.data.success) {
                setAttendance(response.data.attendance);
            }
        } catch (err) {
            console.error('Failed to fetch attendance');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="loading-container" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
                <p>Loading session...</p>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="container" style={{ paddingTop: '2rem' }}>
                <div className="alert alert-error">{error || 'Session not found'}</div>
                <Link to="/teacher/dashboard" className="btn btn-secondary mt-lg">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/teacher/dashboard" className="navbar-brand">
                        AttendanceApp
                    </Link>
                    <ul className="navbar-menu">
                        <li>
                            <Link to="/teacher/dashboard" className="navbar-link">
                                Dashboard
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
                    <h1 className="dashboard-title">{session.title}</h1>
                    <p className="dashboard-subtitle">
                        {session.subject} • {formatDate(session.date)}
                    </p>
                </div>

                <div className="grid grid-cols-2">
                    {/* QR Code Card */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">QR Code</h3>
                            <p className="card-description">
                                Students can scan this code to mark attendance
                            </p>
                        </div>

                        <div className="qr-container">
                            <img
                                src={session.qrCode}
                                alt="Session QR Code"
                                style={{ width: '300px', height: '300px' }}
                            />
                            <p className="text-muted mt-md">
                                Valid until: {formatDate(session.expiresAt)}
                            </p>
                            <span className={`session-badge ${session.active ? 'badge-active' : 'badge-inactive'} mt-sm`}>
                                {session.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Session Info Card */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Session Information</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    Duration
                                </p>
                                <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                                    {session.duration} minutes
                                </p>
                            </div>

                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    Created
                                </p>
                                <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                                    {formatDate(session.createdAt)}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                    Total Attendance
                                </p>
                                <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                                    {attendance.length} student{attendance.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance List */}
                <div className="card mt-xl">
                    <div className="card-header">
                        <h3 className="card-title">Attendance List</h3>
                        <p className="card-description">
                            Real-time attendance tracking
                        </p>
                    </div>

                    {attendance.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👥</div>
                            <p>No students have marked attendance yet</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Marked At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((record, index) => (
                                        <tr key={record._id}>
                                            <td>{index + 1}</td>
                                            <td>{record.student.name}</td>
                                            <td>{record.student.email}</td>
                                            <td>{record.student.department}</td>
                                            <td>{formatDate(record.markedAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SessionDetails;
