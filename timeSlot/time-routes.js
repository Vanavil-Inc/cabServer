const router = require('express').Router();
const jwt = require('jsonwebtoken');

const time = require('./time-model'); 
const config = require('../Config');


 router.route('/timeslot').post((req, res) => {

    const ShiftNo = req.body.ShiftNo;
    const ShiftTiming = req.body.ShiftTiming;

    var timeSlotObj = {
        ShiftNo : ShiftNo,
        ShiftTiming : ShiftTiming
    }
     
    time.create(timeSlotObj, (err, time) => {
            if (err) {
                res.json({
                    success: false,
                    message: "time slot not added",
                    error: err
                });
            }
        
            res.json({
                success: true,
                message: "time slot added successfully",
                result: time
            });

        });
});

router.route('/getalltimeslots').get((req, res) => {
    time.find({}, function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'TimeSlot not found',
                error: err
            });
        } 
            if(response.length > 0){
                res.json({
                    success: true,
                    message: 'TimeSlot Found',
                    result: response
                });
                }else {
                res.json({
                    success: false,
                    message: "No TimeSlot",
                    error: err
                });
             }
    })
});


module.exports = router;