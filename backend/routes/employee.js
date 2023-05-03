var express = require('express');
var router = express.Router();

const EmployeeHelpers= require('../controllers/employeecontroller');
const { employeesec } = require('../middlewares/employee');
/* GET home page. */

router.post('/emplogin', EmployeeHelpers.emplogin)


router.post('/employleave',employeesec, EmployeeHelpers.empleaveaply)

router.post('/leavestatus', employeesec, EmployeeHelpers.empleavestatus)


  
module.exports = router;