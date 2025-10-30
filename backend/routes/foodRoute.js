const express = require("express");
const multer = require("multer");
const { addFood, listFood, removeFood } = require("../controllers/foodcontroller");

const router = express.Router();

// --- Multer config ---
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// --- Routes ---
router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

module.exports = router;
