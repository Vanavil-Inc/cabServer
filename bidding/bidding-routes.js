const router = require('express').Router();
const jwt = require('jsonwebtoken');

const bidding = require('./bidding-model'); 
const config = require('../Config');

router.route('/bidcars').post((req, res) => {

    const name = req.body.name;
    const mobileNo = req.body.mobileNo;
    const date = req.body.date;
    const carNo = req.body.carNo;
    const shiftNo = req.body.shiftNo;
    const noOfCars = req.body.noOfCars;
    const remark = req.body.remark;

    var biddindObj = {
        name : name,
        mobileNo : mobileNo,
        date : date,
        carNo : carNo,
        shiftNo : shiftNo,
        noOfCars : noOfCars,
        remark : remark
    }

    bidding.create(biddindObj, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Something went wrong',
                        error: err
                    });
                }

                res.json({
                    success: true,
                    message: "Car Bidding Successfull",
                    result: user
                });

            });


});

router.route('/getbids').post((req, res) => {
    const mobileNo = req.body.mobileNo;

    bidding.find({mobileNo : mobileNo}, function(err,resp){
        if(err){
            res.json({
                success: false,
                message: 'Mobile Number not found',
                error: err
            });
        }
        if(resp.length > 0){
            res.json({
                success: true,
                message: 'Bidding Found',
                result: resp
            });
        }else {
            res.json({
                success: false,
                message: 'No Bidding Found',
                error: err
            });
         }
    })

});

router.route('/updatebids').put((req, res) => {

    const mobileNo = req.body.mobileNo;
    const date = req.body.date;
    const shiftNo = req.body.shiftNo;
    const noOfCars = req.body.noOfCars;


    bidding.findOneAndUpdate({
        mobileNo : mobileNo, date : date},req.body,function(err, response){
        if (err) {
            res.json({
                success: false,
                message: 'Bidding not updated',
                error: err
            });
        } 
        if(response != null){
            res.json({
                success: true,
                message: "Bidding updated successfully",
                result: response
            }); 
        } else {
            console.log("User Not Found");
            // console.log(err);
            res.json({
                success: false,
                message: "Bidding not updated",
                error: err
            });
        }   
    })

});

module.exports = router;