import mongoose from 'mongoose';
import users from './data/users.js';
import products from './data/products.js';
import provincesData from './data/provinces.json' with { type: 'json' };
import citiesData from './data/cities.json' with { type: 'json' };
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Province from './models/provinceModel.js';
import City from './models/cityModel.js';
import connectDB from './config/db.js';

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Province.deleteMany();
    await City.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);

    const provincesToInsert = provincesData.map(p => ({ 
      name: p.provinceName, 
      original_id: parseInt(p.provinceId) 
    }));
    await Province.insertMany(provincesToInsert);

    const citiesToInsert = citiesData.map(c => ({
      name: c.cityName,
      province_id: parseInt(c.provinceId)
    }));
    await City.insertMany(citiesToInsert);

    console.log('Data Imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error in seeder: ${error}`);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await importData();
};

main(); 