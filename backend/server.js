const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt=require("bcrypt");

// load .env variables from backend folder explicitly
dotenv.config({ path: __dirname + "/.env" });

const userRoute = require("./Routes/userRoute.js");
const app = express();
const port = process.env.PORT || 5000;

// mongodb connection

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World harsha!");
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS for frontend (adjust origin for production)
const cors = require("cors");
app.use(cors());

// guard for missing MONGOURL
if (!process.env.MONGOURL) {
  console.error(
    "FATAL: MONGOURL is not set in backend/.env. Add MONGOURL and restart."
  );
  process.exit(1);
}

// mount routes
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
