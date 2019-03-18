const authRoutes = require('../routes/auth')
const gameRoutes = require('../routes/game')



module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/game', gameRoutes)
  


}
