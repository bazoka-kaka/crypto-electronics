const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), employeesController.getAllEmployees);

module.exports = router;
