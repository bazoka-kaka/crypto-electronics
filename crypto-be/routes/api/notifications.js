const express = require("express");
const router = express.Router();
const notifController = require("../../controllers/notifController");

router
  .route("/")
  .get(notifController.getUserNotifications)
  .post(notifController.createNewNotification)
  .delete(notifController.clearNotifications);

router.route("/:id").delete(notifController.deleteNotification);

module.exports = router;
