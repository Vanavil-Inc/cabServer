const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    name: {
        type: String
    },
    password:{
        type: String
    },
    mobileNo: {
        type: Number
    },
    token : {
        type: String
    },
    ObjId: {
        type: ObjectID
    },
})