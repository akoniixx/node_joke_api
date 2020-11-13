const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongo_uri = "mongodb+srv://root:root@cluster0.kv97h.mongodb.net/THAI-JOKE?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("connected to the database ");
  },
  error => {
    console.log("failed connect to database" + error);
    process.exit();
  }
);

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port" + port);
});

app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

const jokeRouter = require("./router/jokeRouter");

app.use("/jokes", jokeRouter);

app.use((req, res, next) => {
  const err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});