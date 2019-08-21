const mongoose = require('mongoose')

const cars = mongoose.model('cars', require('./cars-schema'));

module.exports = cars;