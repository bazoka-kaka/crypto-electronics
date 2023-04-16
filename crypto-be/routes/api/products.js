const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const roles_list = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");
const verifyJWT = require("../../middlewares/verifyJWT");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    verifyJWT,
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.createNewProduct
  )
  .put(
    verifyJWT,
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.updateProduct
  );

router
  .route("/:id")
  .get(productsController.getProduct)
  .delete(
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.deleteProduct
  );

module.exports = router;
