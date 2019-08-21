const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    jobId: {
        type: String
    },
    name: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    carPlate: {
        type: String
    },
    IU_NO:{
        type: String
    },
    time_in : {
        type: String
    },
    time_out:{
        type: String
    },
    total_hour:{
        type: String
    },
    remark:{
        type: String
    },
    ObjId: {
        type: ObjectID
    },
})