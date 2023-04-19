const Notification = require("../model/Notification");

const getUserNotifications = async (req, res) => {
  const { userId } = req?.body;
  if (!userId)
    return res.status(400).json({ message: "User id parameter is required" });
  const notifications = await Notification.find({ userId }).exec();
  if (!notifications) return res.sendStatus(204);
  res.json(notifications);
};

const createNewNotification = async (req, res) => {
  const { userId, title, description } = req?.body;
  if (!userId || !title || !description)
    return res
      .status(400)
      .json({ message: "User id, title, and description are required" });
  const result = await Notification.create({
    userId,
    title,
    description,
  });
  res.status(201).json(result);
};

const deleteNotification = async (req, res) => {
  const { id } = req?.params;
  if (id) return res.status(400).json({ message: "ID parameter is required" });
  const notification = await Notification.findOne({ _id: id }).exec();
  if (!notification) return res.sendStatus(204);
  await Notification.deleteOne({ _id: id });
  res.sendStatus(204);
};

const clearNotifications = async (req, res) => {
  const { userId } = req?.body;
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
