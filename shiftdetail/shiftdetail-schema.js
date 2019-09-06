const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    date:{
        type: String
    },
    shift1:{
        type: String
    },
    shift2:{
        type: String
    },
    shift3:{
        type: String
    },
    shift4:{
        type: String
    },
    remark:{
        type: String
    },
    month:{
        type: String
    },
    shift_name1:{
        type: String
    },
    shift_name2:{
        type: String
    },
    shift_name3:{
        type: String
    },
    shift_name4:{
        type: String
    },
    ObjId: {
        type: ObjectID
    }
})