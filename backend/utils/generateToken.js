import jwt from "jsonwebtoken";

const generateToken = (res, userId, rememberMe) => {
  const expiresIn = rememberMe ? "30d" : "1d";
  const maxAge = rememberMe
    ? 30 * 24 * 60 * 60 * 1000
    : 1 * 24 * 60 * 60 * 1000;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge,
  });
};

export default generateToken;
