const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const notifications = Object.values(foundUser.notifications).filter(
      Boolean
    );
    // create new accessToken
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles, notifications } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({
      id: foundUser._id,
      accessToken,
      user: foundUser.username,
      roles,
      notifications,
    });
  });
};

module.exports = { handleRefreshToken };
