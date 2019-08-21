const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./cars-model'); 
const config = require('../Config');


 router.route('/cars').post((req, res) => {

    const jobId = req.body.jobId;
    const name = req.body.name;
    const mobileNo = req.body.mobileNo;
    const carPlate = req.body.carPlate;
    const IU_NO = req.body.IU_NO;
    const remark = req.body.remark;
    

    User.find({
        mobileNo : mobileNo
    },function(err, response){
        if(err){
            console.log(err)
            res.json({
                success: false,
                message: "something went wrong!",
                error: err
            })
        }
        if(response.length>0){
            res.json({
                success: false,
                message: "Mobile number already registered",
                error: err
            })
        } else {
            var userObj = {
                jobId : jobId,
                name : name,
                mobileNo : mobileNo,
                carPlate : carPlate,
                IU_NO : IU_NO,
                remark : remark
            }
        
            User.create(userObj, (err, user) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'car already added',
                                error: err
                            });
                        }
        
                        res.json({
                            success: true,
                            message: "car added successfully",
                            result: user
                        });
        
                    });
        }
        
    })
});


module.exports = router;