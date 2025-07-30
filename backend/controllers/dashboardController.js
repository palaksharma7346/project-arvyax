const Session = require("../models/Session");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const allSessions = await Session.find({ user_id: userId });

    const publishedCount = allSessions.filter(s => s.status === "published").length;
    const draftCount = allSessions.filter(s => s.status === "draft").length;

    const stats = {
      totalSessions: allSessions.length,
      publishedCount,
      draftCount,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
