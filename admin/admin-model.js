const mongoose = require('mongoose')

const admin = mongoose.model('admin', require('./admin-schema'));

module.exports = admin;