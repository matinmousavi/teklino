import bcrypt from "bcryptjs";

const users = [
  {
    name: "مدیر سیستم",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
];

export default users;
