const Notification = require("../model/Notification");
const User = require("../model/User");

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
  const notifications = await Notification.find({ userId: id }).exec();
  console.log(allowedNotifications, notifications);
  const filteredNotifications = notifications.filter(
    (notif) => allowedNotifications?.indexOf(notif?.type) !== -1
  );
  if (!filteredNotifications) return res.sendStatus(204);
  res.json(filteredNotifications);
};

const createNewNotification = async (req, res) => {
  const { userId, title, description, link, type } = req?.body;
  if (!userId || !title || !description || !link || !type)
    return res.status(400).json({
      message: "User id, title, link, type and description are required",
    });
  const result = await Notification.create({
    userId,
    title,
    description,
    link,
    type,
  });
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
