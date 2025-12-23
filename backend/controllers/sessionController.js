const Session = require('../models/Session');
const QRCode = require('qrcode');
const crypto = require('crypto');

// @desc    Create new session
// @route   POST /api/sessions
// @access  Private (Teacher only)
exports.createSession = async (req, res) => {
    try {
        const { title, subject, duration } = req.body;

        // Generate unique session code
        const sessionCode = crypto.randomBytes(16).toString('hex');

        // Calculate expiration time
        const expiresAt = new Date(Date.now() + (duration || 60) * 60 * 1000);

        // Generate QR code data
        const qrData = JSON.stringify({
            sessionCode,
            teacherId: req.user.id,
            timestamp: Date.now()
        });

        // Generate QR code as base64
        const qrCode = await QRCode.toDataURL(qrData);

        // Create session
        const session = await Session.create({
            teacher: req.user.id,
            title,
            subject,
            duration: duration || 60,
            qrCode,
            sessionCode,
            expiresAt
        });

        res.status(201).json({
            success: true,
            session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all sessions for logged in teacher
// @route   GET /api/sessions
// @access  Private (Teacher only)
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ teacher: req.user.id })
            .sort({ createdAt: -1 })
            .populate('teacher', 'name email');

        res.status(200).json({
            success: true,
            count: sessions.length,
            sessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single session
// @route   GET /api/sessions/:id
// @access  Private
exports.getSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate('teacher', 'name email college department');

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        // Check if user is the teacher or a student
        if (session.teacher._id.toString() !== req.user.id && req.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this session'
            });
        }

        res.status(200).json({
            success: true,
            session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private (Teacher only)
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

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
                message: 'Not authorized to delete this session'
            });
        }

        await session.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Session deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Toggle session active status
// @route   PUT /api/sessions/:id/toggle
// @access  Private (Teacher only)
exports.toggleSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

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
                message: 'Not authorized to modify this session'
            });
        }

        session.active = !session.active;
        await session.save();

        res.status(200).json({
            success: true,
            session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
