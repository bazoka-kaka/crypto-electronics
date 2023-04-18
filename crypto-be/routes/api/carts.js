const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");

router.route("/buy").post(cartController.buyProduct);
router.route("/pay").post(cartController.payCart);
router.route("/products").put(cartController.updateProduct);

module.exports = router;
