var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const { EmployeeData } = require('../schemas/admin');
const { Empleave ,EmpJob} = require('../schemas/employee');

module.exports = {
  emplogin: (req, res) => {
    let Empstatus = false
    return new Promise(async (resolve, reject) => {
      console.log("employeesides", req.body);
      emppass = await bcrypt.hash(req.body.password, 10)
      const isEmployee = await EmployeeData.findOne({ Username: req.body.email })
      console.log(isEmployee);
      if (isEmployee) {
        let EmpStatus = await bcrypt.compare(req.body.password, isEmployee.Password)
        console.log("jo", EmpStatus);
        if (EmpStatus) {

          let status = {
            Empstatus: true,
            userName: isEmployee.Name,
            id: isEmployee._id
          }
          resolve(status)
        } else {
          resolve(Empstatus)

        }
      } else {
        resolve(Empstatus)
      }


    }).then((data) => {
      let token = jwt.sign({ employee: req.body.email }, process.env.SECRET_KEY, { expiresIn: '50000' });
      console.log(token);
      if (data) {
        res.json({
          status: "success",
          message: "employee verified",
          user: data.userName,
          id: data.id,
          token,
          employeelogged: true

        })
      } else {
        res.json({
          employeelogged: false
        })
      }

    })

  },
  empleaveaply: async (req, res) => {
    try {

      await Empleave.find({ empid: req.body.empid })

      const Employeleave = new Empleave(req.body)
      Employeleave.save()

    } catch (err) {
      console.log(err);

    }





  },
  empleavestatus: async (req, res) => {
    try {
      await Empleave.findOneAndUpdate({ _id: req.body.empid }, { Approved: req.body.status })
      const emp = await Empleave.findOne({ _id: req.body.empid })
      console.log("empdatahere", emp);
      await EmployeeData.findOneAndUpdate({ _id: emp.empid }, { Availability: false })
      leave = true
      res.json({
        leave
      })

    } catch (err) {
      console.log(err);

    }
    console.log(data.empid);


  },


}