const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser')

const User = require('./user-model'); 
const config = require('../Config');



 router.route('/registeruser').post((req, res) => {

    
    const name = req.body.name;
    const password = req.body.password;
    const mobileNo = req.body.mobileNo;
    const userType = req.body.userType;
    const email = req.body.email;

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
                message: "Mobile number registered",
                error: err
            })
        } else {
            var userObj = {
                name : name,
                password : password,
                mobileNo : mobileNo,
                userType : userType,
                email : email
            }
        
            User.create(userObj, (err, user) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: 'User already Registered',
                                error: err
                            });
                        }
        
                        res.json({
                            success: true,
                            message: "User registered successfully",
                            result: user
                        });
        
                    });
        }
        
    })
});


router.route('/login').post((req, res) => {
    const mobileNo = req.body.mobileNo;
    const password = req.body.password;

    let token =  jwt.sign({mobileNo, password}, config.secret, { expiresIn: '60000' });
    if(mobileNo != null && password !=null){
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
    
        if(response != "") {
            if(response[0].password === password){
                User.findOneAndUpdate({mobileNo : mobileNo},{token : token}, function(err, resp){
                    if(err){
                        console.log("update err" + err);
                    } else {
                        console.log("token updated : "+ token);
                        // console.log("token updated response : " + resp);
                        User.find({mobileNo : mobileNo}, function(err, updateResp){
                            if(err){
                                res.json({
                                    success: false,
                                    message: constant.genericError,
                                    error: err
                                })
                            } else {
                                console.log("updated new resp : " + updateResp);
                                res.json({
                                    success: true,
                                    message: "Login success",
                                    result: updateResp
                                });
                            }
                        })
                       
                    }
                })
            } else { 
                res.json({
                    success: false,
                    message: "Incorrect MobileNumber/Password",
                    error: err
                });
            }
        } else {
            res.json({
                success: false,
                message: 'User does not Exists',
                error: err
            })

        }
    
    })
}else{
    res.json({
        success: false,
        message: 'User does not Exists',
        //error: err
    })
}
})

router.route('/carsbid').post((req, res) => {
    const mobileNo = req.body.mobileNo;
    const number_of_cars = req.body.number_of_cars;
    const time_slot = req.body.time_slot;

    User.findOneAndUpdate({
        mobileNo : mobileNo},{number_of_cars: number_of_cars,time_slot:time_slot},function(err, response){
        if (err) {
            res.json({
                success: false,
                message: "something went wrong!",
                error: err
            });
        } 
        if(response != null){
            User.find({mobileNo:mobileNo},function(err,resp){
                if(err){
                    res.json({
                        success: false,
                        message: "user not found",
                        error: err
                    });
                } else{
                    res.json({
                        success: true,
                        message: "biding done",
                        result: resp
                    });
                }
            })
             
        } else {
            res.json({
                success: false,
                message: "user not found",
                error: err
            });
        }

            
    })
});

module.exports = router;