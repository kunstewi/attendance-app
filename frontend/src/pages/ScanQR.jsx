import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../utils/api';
import { logout } from '../utils/auth';

function ScanQR() {
    const navigate = useNavigate();
    const [scanning, setScanning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        let scanner;

        const initScanner = () => {
            scanner = new Html5QrcodeScanner('qr-reader', {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            });

            scanner.render(onScanSuccess, onScanError);
            setScanning(true);
        };

        initScanner();

        return () => {
            if (scanner) {
                scanner.clear().catch(console.error);
            }
        };
    }, []);

    const onScanSuccess = async (decodedText) => {
        try {
            // Parse QR code data
            const qrData = JSON.parse(decodedText);

            // Mark attendance
            const response = await api.post('/attendance/mark', {
                sessionCode: qrData.sessionCode
            });

            if (response.data.success) {
                setSuccess(true);
                setSessionInfo(response.data.attendance.session);
                setError('');

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    navigate('/student/dashboard');
                }, 3000);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Invalid QR code or failed to mark attendance');
            }
            setSuccess(false);
        }
    };

    const onScanError = (errorMessage) => {
        // Ignore scan errors (they happen frequently during scanning)
        console.log(errorMessage);
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
                            <Link to="/student/dashboard" className="navbar-link">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/student/scan" className="navbar-link active">
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
                    <h1 className="dashboard-title">Scan QR Code</h1>
                    <p className="dashboard-subtitle">
                        Point your camera at the QR code to mark attendance
                    </p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {success && (
                        <div className="alert alert-success mb-lg">
                            ✓ Attendance marked successfully for {sessionInfo?.title}!
                            <br />
                            Redirecting to dashboard...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-error mb-lg">
                            {error}
                        </div>
                    )}

                    <div className="card">
                        <div id="qr-reader" style={{ width: '100%' }}></div>

                        {scanning && !success && (
                            <div className="alert alert-info mt-lg">
                                <p style={{ margin: 0 }}>
                                    📷 Position the QR code within the frame
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-xl">
                        <Link to="/student/dashboard" className="btn btn-secondary">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScanQR;
