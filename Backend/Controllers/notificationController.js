import Notifications from '../Models/notfication.js';
import Users from '../Models/users.js';

export const getUserNotifications = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const notifications = await Notifications.find({ recipient: user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (err) {
    console.error("getUserNotifications error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
