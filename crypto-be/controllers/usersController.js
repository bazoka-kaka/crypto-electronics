const User = require("../model/User");
const bcrypt = require("bcrypt");
const NOTIF_LIST = require("../config/notif_list");

const getAllUsers = async (req, res) => {
  const users = await User.find().exec();
  if (!users) return res.sendStatus(204);
  res.json(users);
};

const createNewUser = async (req, res) => {
  const { user, fullname, email, pwd, roles } = req?.body;
  if (!user || !pwd || !fullname || !email || !roles)
    return res.status(400).json({
      message: "Username, fullname, email, roles, and password are required.",
    });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // create new user
    const result = await User.create({
      username: user,
      fullname,
      email,
      roles,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const foundUser = await User.findOne({ _id: req.body.id }).exec();
  if (!foundUser) return res.sendStatus(204);
  if (req?.body?.user) {
    const duplicate = await User.findOne({ username: req.body.user }).exec();
    if (duplicate && duplicate.username !== foundUser.username)
      return res.sendStatus(409);
    foundUser.username = req.body.user;
  }
  if (req?.body?.email) foundUser.email = req.body.email;
  if (req?.body?.fullname) foundUser.fullname = req.body.fullname;
  if (req?.body?.roles) foundUser.roles = req.body.roles;
  if (req?.body?.notifs) {
    const notifs = req.body.notif;
    foundUser.notifications = {
      Offers: notifs.find((val) => val === NOTIF_LIST.Offers),
      Payment: notifs.find((val) => val === NOTIF_LIST.Payment),
      Updates: notifs.find((val) => val === NOTIF_LIST.Updates),
    };
  }
  if (req?.body?.pwd) {
    const match = await bcrypt.compare(req.body.oldPwd, foundUser.password);
    if (!match)
      return res.status(401).json({ message: "Old password is wrong" });
    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    foundUser.password = hashedPwd;
  }
  // save updated password
  const result = await foundUser.save();
  console.log(result);
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const foundUser = await User.findOne({ _id: req.params.id }).exec();
  if (!foundUser) return res.sendStatus(204);
  await foundUser.deleteOne({ _id: req.params.id });
  res.sendStatus(204);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const foundUser = await User.findOne({ _id: req.params.id }).exec();
  if (!foundUser) return res.sendStatus(204);
  res.json(foundUser);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
