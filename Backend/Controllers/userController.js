import Users from "../Models/users.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Users.findById(userId);

    if (user) {
      res.json({
        success: true,
        userData: {
          userId: user._id,
          username: user.username,
        },
      });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("getUserData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
