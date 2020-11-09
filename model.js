const mongoose = require('mongoose');

const jokeSchema = mongoose.Schema(
  {
        joke: {
            type: String
          },
        like: {
            type: Number
          },
        dislike:{
              type: Number
          }
  }
);
const joke = mongoose.model('Joke', jokeSchema);
module.exports = joke;