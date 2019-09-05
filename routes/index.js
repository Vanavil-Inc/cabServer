const router = require('express').Router();

router.get('/', (req, res) => {
res.status(200).json({ message: 'Connected!' });
});

router.use('/api', require('../users/user-routes'));
router.use('/api', require('../timeSlot/time-routes'));
router.use('/api', require('../cars/cars-routes'));
router.use('/api', require('../bidding/bidding-routes'));
router.use('/admin', require('../shiftdetail/shiftdetail-routes'));
router.use('/admin', require('../admin/admin-routes'));
module.exports = router;