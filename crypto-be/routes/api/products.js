const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const roles_list = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.createNewProduct
  )
  .put(
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.updateProduct
  )
  .delete(
    verifyRoles(roles_list.Admin, roles_list.Editor),
    productsController.deleteProduct
  );

router.route("/:id").get(productsController.getProduct);

module.exports = router;
