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
  if (user && user.isBlocked) {
    res.status(403);
    throw new Error("حساب کاربری شما مسدود شده است");
  }
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
  let { name, username, email, password, mobile } = req.body;

  if (mobile && mobile.startsWith("0")) {
    mobile = `98${mobile.substring(1)}`;
  }

  const userExists = await User.findOne({
    $or: [{ email: email }, { username: username }, { mobile: mobile }],
  });

  if (userExists) {
    res.status(400);
    throw new Error(
      "کاربر با این ایمیل، نام کاربری یا شماره موبایل از قبل وجود دارد"
    );
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    mobile,
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
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "User logged out" });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
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
  const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
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

const requestOtp = asyncHandler(async (req, res) => {
  let { mobile } = req.body;

  if (mobile.startsWith("0")) {
    mobile = `98${mobile.substring(1)}`;
  } else if (mobile.startsWith("9") && mobile.length === 10) {
    mobile = `98${mobile}`;
  }

  const user = await User.findOne({ mobile });

  if (!user) {
    res.status(404);
    throw new Error("کاربری با این شماره موبایل یافت نشد");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 30 * 1000;
  await user.save();

  console.log("====================================");
  console.log(`✅ OTP for ${mobile} is: ${otp}`);
  console.log("====================================");

  res.status(200).json({
    success: true,
    message: "کد یکبار مصرف شبیه‌سازی و در کنسول بک‌اند چاپ شد",
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  let { mobile, otp } = req.body;

  if (mobile.startsWith("0")) {
    mobile = `98${mobile.substring(1)}`;
  } else if (mobile.startsWith("9") && mobile.length === 10) {
    mobile = `98${mobile}`;
  }

  const user = await User.findOne({
    mobile,
    otpExpires: { $gt: Date.now() },
  });

  if (!user || user.otp !== otp.toString()) {
    res.status(400);
    throw new Error("کد وارد شده نامعتبر یا منقضی شده است");
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  generateToken(res, user._id, true);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role === "admin") {
      res.status(400);
      throw new Error("امکان حذف کاربر ادمین وجود ندارد");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "کاربر با موفقیت حذف شد" });
  } else {
    res.status(404);
    throw new Error("کاربر یافت نشد");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("کاربر یافت نشد");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("کاربر یافت نشد");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, role } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400);
    throw new Error("کاربر با این ایمیل یا نام کاربری از قبل وجود دارد");
  }

  const user = await User.create({ name, username, email, password, role });

  if (user) {
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

const toggleUserBlockStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === "admin") {
      res.status(400);
      throw new Error("امکان مسدود کردن کاربر ادمین وجود ندارد");
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(200).json({ message: "وضعیت کاربر با موفقیت تغییر کرد" });
  } else {
    res.status(404);
    throw new Error("کاربر یافت نشد");
  }
});

export {
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
  toggleUserBlockStatus,
};
