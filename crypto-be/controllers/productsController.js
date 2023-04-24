const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find().exec();
  if (!products) return res.status(204).json({ message: "No products found." });
  res.json(products);
};

const createNewProduct = async (req, res) => {
  if (!req?.body?.name || !req?.body?.tags)
    return res
      .status(400)
      .json({ message: "Product name and tags are required." });
  // save new product
  const newProduct = req.body;
  const result = await Product.create(newProduct);
  console.log(result);
  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const product = await Product.findOne({ _id: req.body.id }).exec();
  if (!product) return res.status(404).json({ message: "Product not found." });
  if (req?.body?.name) product.name = req.body.name;
  if (req?.body?.imgUrl) product.imgUrl = req.body.imgUrl;
  if (req?.body?.price) product.price = req.body.price;
  if (req?.body?.stock) product.stock = req.body.stock;
  if (req?.body?.description) product.description = req.body.description;
  if (req?.body?.tags) product.tags = req.body.tags;
  const result = await product.save();
  console.log(result);
  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const result = await Product.deleteOne({ _id: req.params.id });
  res.sendStatus(204);
};

const getProduct = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required." });
  const product = await Product.findOne({ _id: req.params.id }).exec();
  if (!product)
    return res.status(404).json({ message: "Product is not found." });
  res.json(product);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
