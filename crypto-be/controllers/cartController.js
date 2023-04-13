const User = require("../model/User");
const Product = require("../model/Product");

const buyProduct = async (req, res) => {
  const { userId, productId, total } = req?.body;
  if (!userId || !productId || !total)
    return res.status(400).json({
      message: "Total product, user id, and product id are required.",
    });
  const product = await Product.findOne({ _id: productId }).exec();
  if (!product)
    return res.status(404).json({ message: "Product is not found." });
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) return res.sendStatus(401);
  if (total <= 0)
    return res
      .status(400)
      .json({ message: "Total product must be more than zero" });

  if (product.stock < total)
    return res.status(400).json({ message: "Product stock is not sufficient" });
  product.stock -= total;

  const userProduct = user.cart.products.find(
    (pro) => pro.name == product.name
  );
  if (userProduct) {
    console.log("product is found");
    const filteredProducts = user.cart.products.filter(
      (pro) => pro.name !== product.name
    );
    user.cart.products = [...filteredProducts, product];
  } else {
    console.log("product is not found");
    user.cart.products = [...user.cart.products, product];
  }

  user.cart.totalPrice += total * product.price;
  user.cart.paid = false;

  const result = await user.save();
  const updatedProduct = await product.save();

  console.log(updatedProduct);

  res.json(result);
};

const payCart = async (req, res) => {
  const { userId } = req?.body;
  if (!userId)
    return res.status(400).json({ message: "User id parameter is required." });
  const foundUser = await User.findOne({ _id: userId }).exec();
  foundUser.cart.paid = true;
  foundUser.cart.products = [];
  foundUser.cart.totalPrice = 0;
  const result = await foundUser.save();
  console.log(result);
  res.json(result);
};

module.exports = {
  buyProduct,
  payCart,
};
