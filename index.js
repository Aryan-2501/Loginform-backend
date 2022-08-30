const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`database connected at ${process.env.MONGODB_URL}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});
