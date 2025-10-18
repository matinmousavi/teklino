import asyncHandler from "express-async-handler";
import Province from "../models/provinceModel.js";
import City from "../models/cityModel.js";

const getProvinces = asyncHandler(async (req, res) => {
  const provinces = await Province.find({});
  res.json(provinces);
});

const getCitiesByProvince = asyncHandler(async (req, res) => {
  const province = await Province.findById(req.params.provinceId);
  if (province) {
    const cities = await City.find({ province_id: province.original_id });
    res.json(cities);
  } else {
    res.status(404);
    throw new Error("استان یافت نشد");
  }
});

export { getProvinces, getCitiesByProvince };
