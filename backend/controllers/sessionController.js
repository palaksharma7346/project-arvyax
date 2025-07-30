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
  const { id, title, tags, json_file_url } = req.body;
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
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        data,
        { new: true }
      );
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
  const { id, title, tags, json_file_url } = req.body;

  try {
    let session;
    if (id) {
      session = await Session.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        {
          title,
          tags,
          json_file_url,
          status: 'published',
          updated_at: new Date(),
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user._id,
        title,
        tags,
        json_file_url,
        status: 'published',
      });
    }

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
