const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");

router.route("/buy").post(cartController.buyProduct);
router.route("/pay").post(cartController.payCart);

module.exports = router;
