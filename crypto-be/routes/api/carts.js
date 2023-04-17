const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");

router.route("/buy").post(cartController.buyProduct);
router.route("/pay").post(cartController.payCart);
router.route("/products/add").post(cartController.updateProduct);
router.route("/products/sub").post(cartController.updateProduct);

module.exports = router;
