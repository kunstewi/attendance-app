const express = require('express');
const router = express.Router();
const {
    createSession,
    getSessions,
    getSession,
    deleteSession,
    toggleSession
} = require('../controllers/sessionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('teacher'), createSession);
router.get('/', protect, authorize('teacher'), getSessions);
router.get('/:id', protect, getSession);
router.delete('/:id', protect, authorize('teacher'), deleteSession);
router.put('/:id/toggle', protect, authorize('teacher'), toggleSession);

module.exports = router;
