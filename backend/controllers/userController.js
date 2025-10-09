import asyncHandler from "express-async-handler";
import crypto from "crypto";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password, remember } = req.body;

  const user = await User.findOne({
    $or: [{ email: email }, { username: email }],
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, remember);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("نام کاربری یا رمز عبور نامعتبر است");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExists = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (userExists) {
    res.status(400);
    throw new Error("کاربر با این ایمیل یا نام کاربری از قبل وجود دارد");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("اطلاعات کاربر نامعتبر است");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error("کاربری با این ایمیل یافت نشد");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetURL = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
  const message = `برای بازنشانی رمز عبور خود، لطفاً روی لینک زیر کلیک کنید:\n\n${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "درخواست بازنشانی رمز عبور تکلینو",
      message,
    });
    res.status(200).json({ success: true, data: "ایمیل بازنشانی ارسال شد" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    throw new Error("ایمیل ارسال نشد");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("لینک بازنشانی نامعتبر یا منقضی شده است");
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  generateToken(res, user._id);
  res.status(200).json({ message: "رمز عبور با موفقیت تغییر کرد" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  forgotPassword,
  resetPassword,
};
