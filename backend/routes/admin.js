var express = require('express');
var router = express.Router();
const adminhelpers = require('../controllers/admincontroller')

/* ADMIN   LOGIN SECTION*/
router.post('/adminlogin', adminhelpers.adminlogin)

router.post('/minorserviceadd', adminhelpers.addminorservice)




router.get('/minorserviceslist', adminhelpers.minorservicelist)




router.post('/normalserviceadd', adminhelpers.addnormalservice)







router.get('/normalserviceslist', adminhelpers.normalservicelist)


router.post('/minorservicedelete', adminhelpers.minordelete)




router.post('/normalservicedelete', adminhelpers.normaldelete)



router.post('/majorserviceadd', adminhelpers.addmajorservice)




router.get('/majorserviceslist', adminhelpers.majorservicelist)

router.post('/majorservicedelete', adminhelpers.majordelete)

router.get('/getemployee', adminhelpers.getemployee)



router.post('/employeeadd', adminhelpers.employeereg)



router.post('/empstatus', adminhelpers.empstatusupdate)






router.get('/empleavelist', adminhelpers.leavelist)



module.exports = router; 