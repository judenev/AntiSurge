var express = require('express');
var router = express.Router();
const adminhelpers = require('../controllers/admincontroller')

/* ADMIN   LOGIN SECTION*/
router.post('/adminlogin', adminhelpers.adminlogin)
/*---------------------------------------------------------------------------------*/

/* ADMIN  SERVICE ADDING DELETING ADN LISTING*/
router.post('/minorserviceadd', adminhelpers.addminorservice)
router.get('/minorserviceslist', adminhelpers.minorservicelist)
router.post('/minorservicedelete', adminhelpers.minordelete)

router.post('/normalserviceadd', adminhelpers.addnormalservice)
router.get('/normalserviceslist', adminhelpers.normalservicelist)
router.post('/normalservicedelete', adminhelpers.normaldelete)

router.post('/majorserviceadd', adminhelpers.addmajorservice)
router.get('/majorserviceslist', adminhelpers.majorservicelist)
router.post('/majorservicedelete', adminhelpers.majordelete)
/*-----------------------------------------------------------------------------------*/


/* ADMIN  EMPLOYEE MANAGING SECTION*/
router.post('/employeeadd', adminhelpers.employeereg)
router.get('/getemployee', adminhelpers.getemployee)
router.post('/empstatus', adminhelpers.empstatusupdate)
router.post('/empchangepass',adminhelpers.empChangePass)
router.get('/empleavelist', adminhelpers.leavelist)
router.post('/employedelete/:id',adminhelpers.empdelete)

/*-----------------------------------------------------------------------------------*/

/* ADMIN JOB MANAGEMENT*/

router.get('/nonallocated',adminhelpers.nonallocated)
router.get('/allchecks',adminhelpers.Allchecks)
router.get('/jobstatus',adminhelpers.jobstatuscheck)
router.get('/jobcategory',adminhelpers.jobcategory)

/* ADMIN JOB ESTIMATION CREATION*/

router.post('/userestimation',adminhelpers.customerEstimation)

/*-----------------------------------------------------------------------------------*/



module.exports = router; 













