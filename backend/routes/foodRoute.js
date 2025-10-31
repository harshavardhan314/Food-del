const express = require("express");
const multer = require("multer");
const { addFood, listFood, removeFood } = require("../controllers/foodcontroller");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove",  removeFood);

module.exports = router;
