const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const xlsx = require('xlsx');
const multer = require('multer');
var dateFormat = require('dateformat');
const admin = require('./admin-model');
var groupArray = require('group-array');
var groupBy = require('group-by');
var _ = require('lodash');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

router.post('/shiftupload', upload.single('file'), (req, res, next) => {
    var arr = [];
    const file = req.file;
    const workbook = xlsx.readFile(file.path, { type: 'binary' });
    ws = workbook.Sheets[workbook.SheetNames[0]];
    const sheet_name = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name[0]]);
    try {
        for (var i in data) {
            var newDate = new Date((data[i].Date - (25567 + 2)) * 86400 * 1000);
            var convertedDate = dateFormat(newDate, "mm/dd/yyyy");
            var userObj = {
                date: convertedDate,
                shift1: data[i].Shift1,
                shift2: data[i].Shift2,
                shift3: data[i].Shift3,
                shift4: data[i].Shift4,
                remark: data[i].Remark
            }
            admin.create(userObj, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Something went Wrong',
                        error: err
                    });
                }
            })
        }
        for (var i in data) {
            var newDate = new Date((data[i].Date - (25567 + 2)) * 86400 * 1000);
            var convertedDate = dateFormat(newDate, "mm/dd/yyyy");
            //console.log(conDate); 
            arr[i] =
                {
                    date: convertedDate,
                    shift_name1: '4:00PM - 4:00AM',
                    car_req1: data[i].Shift1,
                    shift_name2: '6:00PM - 6:00AM',
                    car_req2: data[i].Shift2,
                    shift_name3: '9:00PM - 9:00AM',
                    car_req3: data[i].Shift3,
                    shift_name4: '10:00PM - 10:00AM',
                    car_req4: data[i].Shift4,
                    remarks: data[i].Remark
                }
        }
        res.json({
            success: true,
            message: "Shift Details Uploaded",
            result: arr
        });
    }
    catch{
        res.json({
            success: false,
            message: 'Invalid Date Format',
            //error: err
        });
    }
});

module.exports = router;