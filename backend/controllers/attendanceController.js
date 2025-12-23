const Attendance = require('../models/Attendance');
const Session = require('../models/Session');

// @desc    Mark attendance by scanning QR code
// @route   POST /api/attendance/mark
// @access  Private (Student only)
exports.markAttendance = async (req, res) => {
    try {
        const { sessionCode, location } = req.body;

        if (!sessionCode) {
            return res.status(400).json({
                success: false,
                message: 'Session code is required'
            });
        }

        // Find session by code
        const session = await Session.findOne({ sessionCode });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Invalid session code'
            });
        }

        // Check if session is active
        if (!session.active) {
            return res.status(400).json({
                success: false,
                message: 'This session is no longer active'
            });
        }

        // Check if session has expired
        if (new Date() > session.expiresAt) {
            return res.status(400).json({
                success: false,
                message: 'This session has expired'
            });
        }

        // Check if attendance already marked
        const existingAttendance = await Attendance.findOne({
            session: session._id,
            student: req.user.id
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: 'Attendance already marked for this session'
            });
        }

        // Mark attendance
        const attendance = await Attendance.create({
            session: session._id,
            student: req.user.id,
            location: location || {}
        });

        await attendance.populate('student', 'name email');
        await attendance.populate('session', 'title subject');

        res.status(201).json({
            success: true,
            message: 'Attendance marked successfully',
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get attendance for a specific session
// @route   GET /api/attendance/session/:sessionId
// @access  Private (Teacher only)
exports.getSessionAttendance = async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        // Make sure user is session owner
        if (session.teacher.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this attendance'
            });
        }

        const attendance = await Attendance.find({ session: req.params.sessionId })
            .populate('student', 'name email college department')
            .sort({ markedAt: 1 });

        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get student's attendance history
// @route   GET /api/attendance/student
// @access  Private (Student only)
exports.getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.user.id })
            .populate('session', 'title subject date teacher')
            .populate({
                path: 'session',
                populate: {
                    path: 'teacher',
                    select: 'name email'
                }
            })
            .sort({ markedAt: -1 });

        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get attendance statistics for a student
// @route   GET /api/attendance/student/stats
// @access  Private (Student only)
exports.getStudentStats = async (req, res) => {
    try {
        const totalAttendance = await Attendance.countDocuments({ student: req.user.id });

        // Get attendance by subject
        const attendanceBySubject = await Attendance.aggregate([
            {
                $match: { student: req.user.id }
            },
            {
                $lookup: {
                    from: 'sessions',
                    localField: 'session',
                    foreignField: '_id',
                    as: 'sessionInfo'
                }
            },
            {
                $unwind: '$sessionInfo'
            },
            {
                $group: {
                    _id: '$sessionInfo.subject',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalAttendance,
                bySubject: attendanceBySubject
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
