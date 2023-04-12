const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleAuth = async (req, res) => {
  const { user, pwd } = req?.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.status(401).json({ message: "Bad credentials." });
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.status(401).json({ message: "Bad credentials." });

  try {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create refresh token
    const refreshToken = await jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    // create access token
    const accessToken = await jwt.sign(
      { UserInfo: { username: foundUser.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    // save refreshToken to database
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // save refreshToken to cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.json({ user: foundUser.username, accessToken, roles });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { handleAuth };
