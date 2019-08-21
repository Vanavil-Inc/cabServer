const mongoose = require('mongoose')

const User = mongoose.model('User', require('./user-schema'));

module.exports = User;