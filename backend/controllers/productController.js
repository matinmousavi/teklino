import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort || "";
  let sortOptions = {};
  if (sort === "newest") {
    sortOptions = { createdAt: -1 };
  } else if (sort === "rating") {
    sortOptions = { rating: -1 };
  }
  const products = await Product.find({}).sort(sortOptions).limit(limit);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("محصولی یافت نشد");
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("محصول یافت نشد");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "محصول با موفقیت حذف شد" });
  } else {
    res.status(404);
    throw new Error("محصول یافت نشد");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
