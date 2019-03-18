const express = require('express')
const authCheck = require('../config/auth-check')
const Game = require('../models/Game')



const router = new express.Router()

function validateGameCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)
  payload.hoursToBeat = parseFloat(payload.hoursToBeat)
  payload.rating = parseFloat(payload.rating)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.title = 'Game title must be at least 3 symbols.'
  }

  
  if (!payload || typeof payload.developer !== 'string' || payload.developer.length < 3) {
    isFormValid = false
    errors.developer = 'Developer name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 3000) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 3000 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || !payload.rating || payload.rating < 0 || payload.rating > 10) {
    isFormValid = false
    errors.rating = 'Rating must be a number between 0 and 10.'
  }

  if (!payload || !payload.hoursToBeat || payload.hoursToBeat < 0) {
    isFormValid = false
    errors.hoursToBeat = 'Hours to beat must be a positive number.'
  }

  if (!payload || typeof payload.imageUrl !== 'string' || !(payload.imageUrl.startsWith('https://') || payload.imageUrl.startsWith('http://')) || payload.imageUrl.length < 14) {
    isFormValid = false
    errors.imageUrl = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  
  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, async (req, res) => {
  const game = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateGameCreateForm(game)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    let gameObj = {
        title:game.title,
        description:game.description,
        developer:game.developer,
        imageUrl:game.imageUrl,
        price:game.price,
        rating:game.rating,
        hoursToBeat:game.hoursToBeat
        
    }
    Game
      .create(gameObj)
      .then((createdGame) => {
            res.status(200).json({
              success: true,
              message: 'Game added successfully.',
              data: createdGame
         
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Game with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Game
    .find()
    .then(games => {
      res.status(200).json(games)
    })
})

router.get('/:id', (req, res) => {
  let gameId = req.params.id;
  Game
    .findById(gameId)
    .then(game => {
      res.status(200).json(game)
  })
})

router.put('/edit/:id', authCheck, async (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const gameId = req.params.id
    let gameObj = req.body
    const validationResult = validateGameCreateForm(gameObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Game
      .findById(gameId)
      .then(existingGame => {
        existingGame.title = gameObj.title
        existingGame.description = gameObj.description
        existingGame.developer = gameObj.developer
        existingGame.imageUrl = gameObj.imageUrl
        existingGame.price = gameObj.price
        existingGame.rating = gameObj.rating
        existingGame.hoursToBeat = gameObj.hoursToBeat

        existingGame
          .save()
          .then(editedGame => {
            res.status(200).json({
              success: true,
              message: 'Game edited successfully.',
              data: editedGame
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Game with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Game
      .findById(id)
      .then((game) => {
        game
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Game deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})


module.exports = router
