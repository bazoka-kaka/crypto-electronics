const express = require("express");
const router = express.Router();
const notifController = require("../../controllers/notifController");

router.route("/").post(notifController.createNewNotification);

router.post("/delete/:id", notifController.clearNotifications);

router
  .route("/:id")
  .get(notifController.getUserNotifications)
  .delete(notifController.deleteNotification);

module.exports = router;
