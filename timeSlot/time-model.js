const mongoose = require('mongoose')

const timeSlot = mongoose.model('timeSlot', require('./time-schema'));

module.exports = timeSlot;