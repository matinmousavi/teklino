import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  forgotPassword,
  resetPassword,
  requestOtp,
  verifyOtp,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createUser)
  .get(protect, admin, getUsers);
router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
