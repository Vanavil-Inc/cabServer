const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    ShiftNo:{
        type: String
    },
    ShiftTiming:{
        type: String
    },
    ObjId: {
        type: ObjectID
    }
})