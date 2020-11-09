const express = require('express');
const router = express.Router();
const joke = require('./model.js');

// get all
router.get("/", (req, res) => {
  joke.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// get by id
router.get("/:_id", (req, res) => {
joke.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// post
router.post("/", (req, res) => {
  var obj = new joke(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});


// delete
router.delete("/:_id", (req, res) => {
  joke.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

module.exports = router;