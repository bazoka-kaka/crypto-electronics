const Notification = require("../model/Notification");

const getUserNotifications = async (req, res) => {
  const { id } = req?.params;
  if (!id)
    return res.status(400).json({ message: "User id parameter is required" });
  const notifications = await Notification.find({ userId: id }).exec();
  if (!notifications) return res.sendStatus(204);
  res.json(notifications);
};

const createNewNotification = async (req, res) => {
  const { userId, title, description, link } = req?.body;
  if (!userId || !title || !description || !link)
    return res
      .status(400)
      .json({ message: "User id, title, link and description are required" });
  const result = await Notification.create({
    userId,
    title,
    description,
    link,
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
