const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { user, pwd, email, fullname } = req?.body;
  if (!user || !pwd || !email || !fullname)
    return res.status(400).json({
      message: "Username, password, email, and fullname are required.",
    });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // hash password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create new user
    const newUser = await User.create({
      username: user,
      password: hashedPwd,
      fullname: fullname,
      email: email,
    });

    console.log(newUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { handleRegister };
