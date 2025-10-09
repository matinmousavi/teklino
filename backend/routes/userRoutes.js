import express from "express";
import {
  authUser,
  forgotPassword,
  getUsers,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

export default router;
