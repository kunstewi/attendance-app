const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a session title'],
        trim: true
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    duration: {
        type: Number, // in minutes
        required: true,
        default: 60
    },
    qrCode: {
        type: String, // Base64 encoded QR code
        required: true
    },
    sessionCode: {
        type: String, // Unique code embedded in QR
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
sessionSchema.index({ teacher: 1, createdAt: -1 });
sessionSchema.index({ sessionCode: 1 }, { unique: true });

module.exports = mongoose.model('Session', sessionSchema);
