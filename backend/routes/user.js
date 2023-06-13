var express = require('express');
var router = express.Router();
var userHelper = require('../controllers/usercontroller');
const { usersec } = require('../middlewares/user');

/* user Register operations--------------------------- */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/*  USER LOGIN MANAGEMENT. */
router.post('/userlogin', userHelper.userLogin)
router.post('/userreg',userHelper.userReg)
/*======================================================*/


/*  USER JOB MANAGEMENT. */
router.post('/jobreg',usersec,userHelper.Userjobreg)
router.get('/nonallocated',userHelper.getNonallocated)
router.get('/estimate/:id',userHelper.estimatecal)
router.post('/approved/:id',userHelper.Approved)
router.get('/userestimate/:id',userHelper.EstApproval)
router.post('/reject/:id',userHelper.Reject)
router.post("/authenticate",userHelper.auth );
/*======================================================*/


module.exports = router;
