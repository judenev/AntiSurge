const jwt = require('jsonwebtoken')
const asyncHand = require('express-async-handler')

module.exports = {
    employeesec: asyncHand(async (req, res, next) => {


        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {

              let  token = req.headers.authorization.split(' ')[1];
              
                 const decoded = jwt.verify(token, process.env.SECRET_KEY);
                 console.log(decoded,"heyoo");
                 next()
            } catch (err) {
                console.log(err);
			
            res.status(401).json({
                employeelogged: false
            })
			
            }
        }

    })
}