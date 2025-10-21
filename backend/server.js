const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/userroutes");

dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", userroutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
