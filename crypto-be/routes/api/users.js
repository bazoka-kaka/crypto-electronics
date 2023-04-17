const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const roles_list = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(verifyRoles(roles_list.Admin), usersController.getAllUsers)
  .post(verifyRoles(roles_list.Admin), usersController.createNewUser)
  .put(verifyRoles(roles_list.Admin), usersController.updateUser);

router
  .route("/:id")
  .get(verifyRoles(roles_list.Admin), usersController.getUser)
  .delete(verifyRoles(roles_list.Admin), usersController.deleteUser);

module.exports = router;
