const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let gameSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Game already exists.']},
  description: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  developer: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  imageUrl: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  rating: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  hoursToBeat: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
},{usePushEach:true})

let Game = mongoose.model('Game', gameSchema)

module.exports = Game