const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    time_slot:{
        type: String
    },
    date:{
        type: String
    },
    ObjId: {
        type: ObjectID
    }
})