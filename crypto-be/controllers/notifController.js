const Notification = require("../model/Notification");
const User = require("../model/User");
const NOTIF_LIST = require("../config/notif_list");

const getUserNotifications = async (req, res) => {
  const { id } = req?.params;
  if (!id)
    return res.status(400).json({ message: "User ID parameter is required" });
  const foundUser = await User.findOne({ _id: id }).exec();
  if (!foundUser)
    return res.sendStatus(404).json({ message: "User is not found" });
  const allowedNotifications = Object.values(foundUser.notifications).filter(
    Boolean
  );
  const notifications = await Notification.find().exec();
  const filteredNotifications = notifications.filter(
    (notif) =>
      allowedNotifications?.indexOf(notif?.type) !== -1 &&
      ((notif.type === NOTIF_LIST?.Payment && notif.userId === id) ||
        notif.type !== NOTIF_LIST.Payment)
  );
  if (!filteredNotifications) return res.sendStatus(204);
  res.json(filteredNotifications);
};

const createNewNotification = async (req, res) => {
  const { userId, title, description, link, type } = req?.body;
  if (!title || !description || !link || !type)
    return res.status(400).json({
      message: "Title, link, type and description are required",
    });
  let result;
  if (userId) {
    result = await Notification.create({
      userId,
      title,
      description,
      link,
      type,
    });
  } else {
    result = await Notification.create({
      title,
      description,
      link,
      type,
    });
  }

  console.log(result);
  res.status(201).json(result);
};

const deleteNotification = async (req, res) => {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ message: "ID parameter is required" });
  const notification = await Notification.deleteOne({ _id: id });
  console.log(notification);
  res.sendStatus(204);
};

const clearNotifications = async (req, res) => {
  const { id: userId } = req?.params;
  if (!userId)
    return res.status(400).json({ message: "User id parameter is required" });
  await Notification.deleteMany({ userId }).exec();
  res.sendStatus(204);
};

module.exports = {
  getUserNotifications,
  createNewNotification,
  deleteNotification,
  clearNotifications,
};
