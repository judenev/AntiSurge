var express = require('express');
var router = express.Router();

const EmployeeHelpers= require('../controllers/employeecontroller');
const { employeesec } = require('../middlewares/employee');


/* EMPLOYEE LOGIN. */

router.post('/emplogin', EmployeeHelpers.emplogin)
/*======================================================*/

/* EMPLOYEE LEAVE MANAGEMENT. */
router.post('/employleave', EmployeeHelpers.empleaveaply)
router.post('/leavestatus', EmployeeHelpers.empleavestatus)
/*======================================================*/

/* EMPLOYEE JOB MANAGEMENT. */
router.get('/nonallocated',employeesec,EmployeeHelpers.nonallocated)
router.get('/ongoingjobs/:page',employeesec,EmployeeHelpers.Ongoinjobs)
router.get('/completejobs/:page',EmployeeHelpers.CompleteJobs)
router.get('/alljob/:page',employeesec,EmployeeHelpers.alljob)
router.post('/servicestatuschange',EmployeeHelpers.serviceChange)
router.post('/servicestatuschanges',EmployeeHelpers.serviceChanges)
router.post('/complete/:id',EmployeeHelpers.completed)
router.get('/empworkstatus',EmployeeHelpers.empwork)
/*======================================================*/

/* EMPLOYEE WARRANTY CHECK. */
router.get('/warrantycheck/:id',EmployeeHelpers.warrantyCheck)
/*======================================================*/



module.exports = router;