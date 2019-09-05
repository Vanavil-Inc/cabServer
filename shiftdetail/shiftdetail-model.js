const mongoose = require('mongoose')

const shiftdetail = mongoose.model('shiftdetail', require('./shiftdetail-schema'));

module.exports = shiftdetail;