const jwt = require('jsonwebtoken')
const asyncHand = require('express-async-handler')

module.exports = {
    employeesec: asyncHand(async (req, res, next) => {

    //    console.log("heloo",req.headers);
       console.log("auth",req.headers.authorization.split(" ")[1])
       let c= req.headers.authorization.split(" ")[1]
       console.log(c);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            try {
                console.log("1");

              const token =  req.headers.authorization.split(" ")[1];
                
                 const decoded = jwt.verify(token, process.env.SECRET_KEY);
             console.log(decoded,"i can");
          
                 next()
              
            } catch (err) {
                console.log(err);
                console.log("2"),
            res.json({
              
                employeelogged: false
              
            })
			
            }
        }

    })
}