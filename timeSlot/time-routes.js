const router = require('express').Router();
const jwt = require('jsonwebtoken');

const time = require('./time-model'); 
const config = require('../Config');


 router.route('/timeslot').post((req, res) => {

    const time_slot = req.body.time_slot;
    const date = req.body.date;

    var timeSlotObj = {
        time_slot : time_slot,
        date : date
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


module.exports = router;