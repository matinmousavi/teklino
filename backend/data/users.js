import bcrypt from "bcryptjs";

const users = [
  {
    name: "مدیر سیستم",
    username: 'admin',
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    role: "admin",
  },
];

export default users;
