const Session = require('../models/Session');

// GET /sessions - public sessions
exports.getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /my-sessions - user's own sessions
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user._id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /my-sessions/:id - get single session
exports.getSessionById = async (req, res) => {
  try {
    console.log("Session ID:", req.params.id);
console.log("User ID:", req.user._id);
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /my-sessions/save-draft
exports.saveDraft = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;
  const data = {
    user_id: req.user._id,
    title,
    tags,
    json_file_url,
    status: 'draft',
    updated_at: new Date(),
  };

  try {
    let session;
    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.user._id,status:'draft' },
        data,
        { new: true }
      );
      if (!session) {
    return res.status(404).json({ message: 'Draft session not found' });
  }
    } else {
      session = await Session.create(data);
    }

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /my-sessions/publish
exports.publishSession = async (req, res) => {
  const { _id, title, tags, json_file_url, steps } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({ message: 'Session _id required to publish.' });
    }
    const session = await Session.findOneAndUpdate(
      { _id, user_id: req.user._id },
      {
        title,
        tags,
        json_file_url,
        steps,
        status: 'published',
        updated_at: new Date(),
      },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: 'Session not found for publish.' });
    }
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};