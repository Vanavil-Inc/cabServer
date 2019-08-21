const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({

    name: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    date:{
        type: String
    },
    carNo:{
        type: String
    },
    shiftNo:{
        type: String
    },
    noOfCars: {
        type: String
    },
    remark:{
        type: String
    },
    ObjId: {
        type: ObjectID
    },

})