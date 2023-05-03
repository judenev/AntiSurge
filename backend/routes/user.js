var express = require('express');
var router = express.Router();
var userHelper = require('../controllers/usercontroller');
const { usersec } = require('../middlewares/user');

/* user Register operations--------------------------- */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/userreg',usersec,userHelper.userReg)


// user Login Operations------------------------------------

router.post('/userlogin', userHelper.userLogin)
router.post('/jobreg',usersec,userHelper.Userjobreg)
router.get('/nonallocated',userHelper.getNonallocated)
router.get('/estimate/:id',userHelper.estimatecal)
module.exports = router;
