const express = require('express');

const router = express.Router();

// Load User model
const User = require('../../models/User');

router.post('/dbUpdate', (req, res) => {
  // console.log(req.connection.remoteAddress, req.ip);
  const ip = req.ip || req.connection.remoteAddress;
  let redCount = 0;
  let blueCount = 0;
  User.findOne({ ip }).then(user => {
    if (user) {
      if (req.body.params.currentBallColor === 'red') {
        redCount = user.redCount + 1;
        user
          .set({ redCount })
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      } else {
        blueCount = user.blueCount + 1;
        user
          .set({ blueCount })
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }
    } else {
      if (req.body.params.currentBallColor === 'red') {
        redCount = 1;
        blueCount = 0;
      } else {
        redCount = 0;
        blueCount = 1;
      }
      const newUser = new User({
        ip,
        redCount,
        blueCount,
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.get('/getAllUsers', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

module.exports = router;
