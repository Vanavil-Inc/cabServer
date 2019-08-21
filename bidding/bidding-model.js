const mongoose = require('mongoose')

const bidding = mongoose.model('bidding', require('./bidding-schema'));

module.exports = bidding;