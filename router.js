const express = require('express');
const router = express.Router();
const joke = require('./model.js');

// get all
router.get('/', (req, res) => {
  joke.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// get by id
router.get('/:_id', (req, res) => {
joke.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// post
router.post('/', (req, res) => {
  var obj = new joke(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("created");
  });
});

// post like
router.post('/:_id/like', (req, res) => { 
  joke.findById(req.params._id, (err,data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      data.like = req.body.like || data.like
      data.save((err, data) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(data)
      })
    }
  })
})

//post dislike
router.post('/:_id/dislike', (req, res) => { 
  joke.findById(req.params._id, (err,data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      data.dislike = req.body.dislike || data.dislike
      data.save((err, data) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(data)
      })
    }
  })
})

// delete
router.delete('/:_id', (req, res) => {
  joke.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("deleted");
  });
});

module.exports = router;