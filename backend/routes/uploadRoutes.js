import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "teklino",
    format: async (req, file) => "jpg",
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", (req, res) => {
  const uploader = upload.single("image");

  uploader(req, res, function (err) {
    if (err) {
      console.error("<<<<< CLOUDINARY UPLOAD ERROR >>>>>");
      console.error(err);
      console.error("<<<<< END OF ERROR >>>>>");
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "فایلی برای آپلود انتخاب نشده است." });
    }

    res.send({
      message: "تصویر با موفقیت آپلود شد",
      image: req.file.path,
    });
  });
});

export default router;
