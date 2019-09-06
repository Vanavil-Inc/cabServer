const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const xlsx = require('xlsx');
const multer = require('multer');
var dateFormat = require('dateformat');
const shiftdetail = require('./shiftdetail-model');
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
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var arr = [];
    const file = req.file;
    const workbook = xlsx.readFile(file.path, { type: 'binary' });
    ws = workbook.Sheets[workbook.SheetNames[0]];
    const sheet_name = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name[0]]);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    var range = xlsx.utils.decode_range(sheet['!ref']);
    // console.log(range.e.c)
    // for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        
    //         const secondCell = sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})];
    //     console.log(secondCell.w); 
        

    // }
    try{
    for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
        var newDate = new Date((sheet[xlsx.utils.encode_cell({ r: rowNum, c: 0 })].v - (25567 + 2)) * 86400 * 1000);
        var convertedDate = dateFormat(newDate, "mm/dd/yyyy");
        //console.log(monthNames[newDate.getMonth()])
        var userObj = {

            date: convertedDate,
            shift_name1: sheet[xlsx.utils.encode_cell({ r: 0, c: 1 })].w,
            shift1: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })].w,
            shift_name2: sheet[xlsx.utils.encode_cell({ r: 0, c: 2 })].w,
            shift2: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 2 })].w,
            shift_name3: sheet[xlsx.utils.encode_cell({ r: 0, c: 3 })].w,
            shift3: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 3 })].w,
            shift_name4: sheet[xlsx.utils.encode_cell({ r: 0, c: 4 })].w,
            shift4: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 4 })].w,
            remark: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 5 })].w,
            month: monthNames[newDate.getMonth()]
        }
        console.log(userObj)
        shiftdetail.create(userObj, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Something went Wrong',
                    error: err
                });
            }
        })
    }
    for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
        var newDate = new Date((sheet[xlsx.utils.encode_cell({ r: rowNum, c: 0 })].v - (25567 + 2)) * 86400 * 1000);
        var convertedDate = dateFormat(newDate, "mm/dd/yyyy");
        arr[rowNum-1] =
            {
                date: convertedDate,
                shift_name1: sheet[xlsx.utils.encode_cell({ r: 0, c: 1 })].w,
                car_req1: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })].w,
                shift_name2: sheet[xlsx.utils.encode_cell({ r: 0, c: 2 })].w,
                car_req2: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 2 })].w,
                shift_name3: sheet[xlsx.utils.encode_cell({ r: 0, c: 3 })].w,
                car_req3: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 3 })].w,
                shift_name4: sheet[xlsx.utils.encode_cell({ r: 0, c: 4 })].w,
                car_req4: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 4 })].w,
                remarks: sheet[xlsx.utils.encode_cell({ r: rowNum, c: 5 })].w
            }
    }
    //console.log(arr)
    res.json({
        success: true,
        message: "Shift Details Uploaded",
        result: arr
    });
    }catch(e){
        res.json({
            success: false,
            message: "Invalid Date",
        });
    }


});

router.route('/getshiftdetail').post((req, res) => {
    const date = req.body.date;

    shiftdetail.find({date : date}, function(err,resp){
        if(err){
            res.json({
                success: false,
                message: 'Shift not found',
                error: err
            });
        }
        if(resp.length > 0){
            res.json({
                success: true,
                message: 'Shift details Found',
                result: resp
            });
        }else {
            res.json({
                success: false,
                message: 'No Shift details Found for the date sent',
                error: err
            });
         }
    })
})

module.exports = router;