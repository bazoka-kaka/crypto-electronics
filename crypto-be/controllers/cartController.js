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
  product.stock -= parseInt(total);
  product.sold += parseInt(total);

  const userProduct = user.cart.products.find(
    (pro) => pro.name == product.name
  );
  if (userProduct) {
    console.log("product is found");
    const filteredProducts = user.cart.products.filter(
      (pro) => pro.name !== product.name
    );
    const updatedProduct = {
      id: userProduct.id,
      name: userProduct.name,
      stock: userProduct.stock,
      price: userProduct.price,
      imgUrl: userProduct.imgUrl,
      total: userProduct.total + parseInt(total),
    };
    user.cart.products = [...filteredProducts, updatedProduct];
  } else {
    console.log("product is not found");
    const newProduct = {
      id: user.cart.products[user.cart.products?.length - 1]?.id + 1 || 0,
      name: product.name,
      stock: product.stock,
      price: product.price,
      imgUrl: product.imgUrl,
      total: parseInt(total),
    };
    user.cart.products = [...user.cart.products, newProduct];
  }

  user.cart.totalPrice += parseInt(total) * product.price;
  user.cart.paid = false;

  const result = await user.save();
  await product.save();

  console.log(result?.cart?.products);

  res.json(result);
};

const updateProduct = async (req, res) => {
  const { userId, productName, method } = req?.body;
  if (!userId || !productName || !method)
    return res
      .status(400)
      .json({ message: "Userid, productId, and method are required." });
  const foundUser = await User.findOne({ _id: userId }).exec();
  if (!foundUser) return res.status(404).json({ message: "User is not found" });
  const product = foundUser.cart.products.find(
    (pro) => pro.name === productName
  );
  const foundProduct = await Product.findOne({ name: productName }).exec();
  if (!product || !foundProduct)
    return res.status(404).json({ message: "Product is not found" });
  let newProduct = {};
  if (method === "add") {
    newProduct = {
      id: product.id,
      name: product.name,
      stock: product.stock - 1,
      price: product.price,
      imgUrl: product.imgUrl,
      total: product.total + 1,
    };
    foundProduct.sold = foundProduct.sold + 1;
    foundProduct.stock = foundProduct.stock - 1;
    foundUser.cart.totalPrice = foundUser.cart.totalPrice + product.price;
  } else if (method === "sub") {
    newProduct = {
      id: product.id,
      name: product.name,
      stock: product.stock + 1,
      price: product.price,
      imgUrl: product.imgUrl,
      total: product.total - 1,
    };
    foundProduct.sold = foundProduct.sold - 1;
    foundProduct.stock = foundProduct.stock + 1;
    foundUser.cart.totalPrice = foundUser.cart.totalPrice - product.price;
  }

  const filteredProducts = foundUser.cart.products.filter(
    (pro) => pro.name !== productName
  );
  if (newProduct.total !== 0) {
    const unsortedProducts = [...filteredProducts, newProduct];
    foundUser.cart.products = unsortedProducts?.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    );
  } else {
    foundUser.cart.products = filteredProducts;
  }

  const result = await foundUser.save();
  await foundProduct.save();
  console.log(result?.cart?.products);
  return res.json(product);
};

const deleteProduct = async (req, res) => {
  console.log(req.body);
  if (!req?.body?.name || !req?.body?.userId)
    return res
      .status(400)
      .json({ message: "Product name and user id are required" });
  const foundUser = await User.findOne({ _id: req.body.userId }).exec();
  if (!foundUser) return res.status(404).json({ message: "User not found" });
  const foundProduct = await Product.findOne({ name: req.body.name }).exec();
  if (!foundProduct)
    return res.status(404).json({ message: "Product not found" });
  const product = foundUser.cart.products.find(
    (pro) => pro.name === req.body.name
  );
  foundProduct.sold -= product.total;
  foundProduct.stock += product.total;
  foundUser.cart.products = foundUser.cart.products.filter(
    (pro) => pro.name !== req.body.name
  );
  foundUser.cart.totalPrice -= product.total * product.price;

  await foundProduct.save();
  await foundUser.save();

  res.sendStatus(204);
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

const clearCart = async (req, res) => {
  const { id: userId } = req?.params;
  if (!userId)
    return res.status(400).json({ message: "User ID parameter is required." });
  const foundUser = await User.findOne({ _id: userId }).exec();
  const userProducts = foundUser.cart.products;
  // return stocks of products
  userProducts.forEach((product) => {
    const normalizeProduct = async () => {
      const pro = await Product.findOne({ name: product.name }).exec();
      if (!pro) return;
      pro.stock += product.total;
      pro.sold -= product.total;
      await pro.save();
    };
    normalizeProduct();
  });
  foundUser.cart.products = [];
  foundUser.cart.totalPrice = 0;
  const result = await foundUser.save();
  res.json(result);
};

module.exports = {
  buyProduct,
  payCart,
  updateProduct,
  deleteProduct,
  clearCart,
};
