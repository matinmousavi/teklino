import express from "express";
import {
  getProvinces,
  getCitiesByProvince,
} from "../controllers/locationController.js";

const router = express.Router();
router.get("/provinces", getProvinces);
router.get("/cities/:provinceId", getCitiesByProvince);

export default router;
