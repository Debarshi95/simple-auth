const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server started"));
