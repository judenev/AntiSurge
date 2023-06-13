var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const { EmployeeData } = require('../Modals/Admin/EmployeeRegSchemaModal');
const { Empleave } = require('../Modals/Employee/EmployeeLeaveModal');
const { UserJob } = require('../Modals/User/UserJobRegModel');

module.exports = {
  emplogin: (req, res) => {
    let Empstatus = false
    return new Promise(async (resolve, reject) => {

      emppass = await bcrypt.hash(req.body.password, 10)
      const isEmployee = await EmployeeData.findOne({ Username: req.body.email })

      if (isEmployee) {
        const EmpStatus = await bcrypt.compare(req.body.password, isEmployee.Password)

        if (EmpStatus) {

          const status = {
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
      const token = jwt.sign({ employee: req.body.email }, process.env.SECRET_KEY, { expiresIn: '5000000' });

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

      await EmployeeData.findOneAndUpdate({ _id: emp.empid }, { Availability: false })
      leave = true
      res.json({
        leave
      })

    } catch (err) {
      console.log(err);

    }



  },

  nonallocated: async (req, res) => {
    try {
      const Nonallocated = await UserJob.find({}).where({
        'Approved': true,
      })
      res.status(200).json({
        data: Nonallocated,
        employeelogged: true
      })

    } catch (err) {

    }
  },
  Ongoinjobs: async (req, res) => {
    try {
      const pageNo = req.params.page
      const totalJobs = await UserJob.find({}).where({
        'Approved': false,
      }).count()
      const Ongoing = await UserJob.find({}).where({
        'Approved': false,
      }).skip(pageNo * 5).limit(5)

      res.status(200).json({
        data: Ongoing,
        count: totalJobs
      })
    } catch (err) {
      console.log(err);
    }
  },
  CompleteJobs: async (req, res) => {
    try {
      const pageNo = req.params.page
      const totalJobs = await UserJob.find().where({
        'Status': "Completed",
      }).count()

      const completed = await UserJob.find({}).where({
        'Status': "Completed",
      }).skip(pageNo * 5).limit(5)
      res.status(200).json({
        data: completed,
        count: totalJobs
      })
    } catch (err) {
      console.log(err);
    }
  },
  alljob: async (req, res) => {
    try {
      const pageNo = req.params.page
      const totalJobs = await UserJob.find().count();

      const alljob = await UserJob.find().skip(pageNo * 5).limit(5);
      res.status(200).json({
        data: alljob,
        count: totalJobs
      })
    } catch (err) {
      console.log(err);
    }
  },
  serviceChange: async (req, res) => {
    try {


      await UserJob.updateOne({ $and: [{ _id: req.body.modaldata._id }, { jobstatus: { $elemMatch: { title: req.body.rowData.title } } }] }, { $set: { "jobstatus.$.status": "Completed" } })



    } catch (err) {
      console.log(err);

    }
  },
  serviceChanges: async (req, res) => {
    try {


      await UserJob.updateOne({ $and: [{ _id: req.body.modaldata._id }, { jobstatus: { $elemMatch: { title: req.body.rowData.title } } }] }, { $set: { "jobstatus.$.status": "In-progress" } })

    } catch (err) {
      console.log(err);

    }
  },
  completed: async (req, res) => {

    try {

      const dates = new Date();
      
      const day = dates.getDate();
      const month = dates.getMonth() + 1;
      const year =dates.getFullYear()
      
      const currentDates = `${year}/${month}/${day}`;
      
      const deliveryDate = new Date(currentDates)


      await UserJob.findByIdAndUpdate({ _id: req.params.id }, { "Status": "Completed" })
      await UserJob.findByIdAndUpdate({ _id: req.params.id }, { "completed": true })
      await UserJob.findByIdAndUpdate({ _id: req.params.id }, { "Warranty": true })
      await UserJob.findByIdAndUpdate({ _id: req.params.id }, { "WarrantyDate": currentDates })

      res.status(200).json({
        completed: true
      })
    } catch (err) {
      console.log(err);
    }
  },
  empwork: async (req, res) => {

    try {

      const agg = [
        {
          '$project': {
            'article': {
              '$size': '$AttendingJobs'
            },
            'Name': 1
          }
        }
      ]
      const data = await EmployeeData.aggregate(agg).exec()



      res.status(200).json({
        empData: data
      })


    } catch (err) {
      console.log(err);
    }
  },
  warrantyCheck: async (req, res) => {
    let warrantyDay 
    
   let result = await UserJob.findOne({ JobId: req.params.id })

    if (result && result.Warranty) {
      const dates = new Date();
      let day = dates.getDate();
      let month = dates.getMonth() + 1;
      let year = dates.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.

      let currentDates = `${year}/${month}/${day}`;
      console.log(currentDates,"////",result.WarrantyDate);
 
      let fromDate = new Date(currentDates)
      let toDate = new Date(result.WarrantyDate);

      console.log(fromDate,toDate);


      function getDifferenceInDays(date1, date2) {
        let diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
      }
      warrantyDay = (182 - (getDifferenceInDays(fromDate, toDate)))
        console.log(getDifferenceInDays(fromDate, toDate),fromDate,toDate);



    }
    if (result) {
      res.status(200).json({
        found: true,
        data: result,
        warranty: warrantyDay
      })
    } else {
      res.json({
        found: false,
      })
    }
  }
} 