const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: {type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true},
  username: {type: String, required: REQUIRED_VALIDATION_MESSAGE},
  salt: String,
  password: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, '12345678')
    let password2 = encryption.generateHashedPassword(salt, '123123')

    User.create({
      email: 'admin@admin.com',
      username: 'Admin',
      salt: salt,
      password: password,
      roles: ['Admin']
    })

    User.create({
      email: 'user@user.com',
      username: 'User',
      salt: salt,
      password: password2,
      roles: ['User']
    })
  })
}
