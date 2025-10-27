const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", // React app URL (default Vite)
  credentials: true,
}));


// DB
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/user", userRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
