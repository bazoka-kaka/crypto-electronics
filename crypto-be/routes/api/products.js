const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/productsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");
const verifyJWT = require("../../middlewares/verifyJWT");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    productsController.createNewProduct
  )
  .put(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    productsController.updateProduct
  );

router.route("/:id").get(productsController.getProduct).delete(
  // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  productsController.deleteProduct
);

module.exports = router;
