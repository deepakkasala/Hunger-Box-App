const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const ownerRoutes = require("./routes/owner");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/owner", ownerRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB.");
    app.listen(process.env.PORT, (req, res) => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
