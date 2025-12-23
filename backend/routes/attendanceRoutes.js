const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getSessionAttendance,
    getStudentAttendance,
    getStudentStats
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/mark', protect, authorize('student'), markAttendance);
router.get('/session/:sessionId', protect, authorize('teacher'), getSessionAttendance);
router.get('/student', protect, authorize('student'), getStudentAttendance);
router.get('/student/stats', protect, authorize('student'), getStudentStats);

module.exports = router;
