import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { logout } from '../utils/auth';

function CreateSession() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        duration: 60
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/sessions', formData);
            if (response.data.success) {
                navigate(`/teacher/session/${response.data.session._id}`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create session');
        } finally {
            setLoading(false);
        }
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
                            <Link to="/teacher/dashboard" className="navbar-link">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher/create-session" className="navbar-link active">
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
                    <h1 className="dashboard-title">Create Attendance Session</h1>
                    <p className="dashboard-subtitle">
                        Generate a QR code for students to mark their attendance
                    </p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="card">
                        {error && (
                            <div className="alert alert-error mb-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="title">
                                    Session Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-input"
                                    placeholder="e.g., Monday Morning Lecture"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="e.g., Data Structures"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="duration">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    className="form-input"
                                    placeholder="60"
                                    min="5"
                                    max="300"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                                <p className="text-muted mt-sm" style={{ fontSize: '0.875rem' }}>
                                    Students can mark attendance within this time window
                                </p>
                            </div>

                            <div className="flex gap-md">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                    style={{ flex: 1 }}
                                >
                                    {loading ? 'Creating...' : 'Create Session'}
                                </button>
                                <Link
                                    to="/teacher/dashboard"
                                    className="btn btn-secondary btn-lg"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSession;
