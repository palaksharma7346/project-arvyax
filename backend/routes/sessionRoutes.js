const express = require('express');
const router = express.Router();
const {
  getPublicSessions,
  getUserSessions,
  getSessionById,
  saveDraft,
  publishSession,
  deleteSession,
} = require('../controllers/sessionController');
const { uploadJson } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

// Public sessions
router.get('/sessions', getPublicSessions);

// Protected user sessions
router.get('/my-sessions', protect, getUserSessions);
router.get('/my-sessions/:id', protect, getSessionById);
router.post('/my-sessions/save-draft', protect, saveDraft);
router.post('/my-sessions/publish', protect, publishSession);
router.delete("/my-sessions/:id", protect, deleteSession);
module.exports = router;
