const express = require('express');
const router = express.Router();
const joke = require('../model/jokeModel');
const user = require('../model/userModel.js');
const jwt = require("jwt-simple");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "MY_SECRET_KEY";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: SECRET
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.sub === user.email) done(null, true);
  else done(null, false);
});

passport.use(jwtAuth);

const requireJWTAuth = passport.authenticate("jwt", { session: false });

const loginMiddleWare = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let filter = {
    username: username,
    password: password
  };
  user.findOne(filter, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (data) {
      next();
    } else {
      return res.status(500).send("Wrong username and password");
    }
  });
};
router.post("/login", loginMiddleWare, (req, res) => {
  const payload = {
    sub: req.body.username,
    iat: new Date().getTime()
  };
  res.send(jwt.encode(payload, SECRET));
});

router.post("/register", (req, res) => {
  const users = new user({
    email: req.body.email,
    password: req.body.password,
  });
  users.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  })
});

//joke router
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
router.post('/', requireJWTAuth, (req, res) => {
  const obj = new joke(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});


// post like
router.post('/:_id/like', (req, res) => {
  joke.findById(req.params._id, (err, data) => {
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
  joke.findById(req.params._id, (err, data) => {
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
router.delete('/:_id',requireJWTAuth, (req, res) => {
  joke.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("deleted");
  });
});




module.exports = router;