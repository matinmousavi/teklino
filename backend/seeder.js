import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);

    console.log("Data Imported successfully!");
  } catch (error) {
    console.error(`Error in seeder: ${error}`);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();

  if (process.argv[2] === "-d") {
    // destroyData function can be added later
    console.log("Data Destroyed!");
    process.exit();
  } else {
    await importData();
    process.exit();
  }
};

const __filename = fileURLToPath(import.meta.url);
const __isDirectlyRun = process.argv[1] === __filename;

if (__isDirectlyRun) {
  main();
}
