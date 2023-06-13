


var bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { emailSender } = require('./mailcontroller');
const { Admin } = require('../Modals/Admin/AdminSchemaModal');
const { Adminservice } = require('../Modals/Admin/ServiceSchemaModal');
const { EmployeeData } = require('../Modals/Admin/EmployeeRegSchemaModal');
const { Empleave } = require('../Modals/Employee/EmployeeLeaveModal');
const { UserEstimation } = require('../Modals/Admin/UserEstimationModel');
const { UserJob } = require('../Modals/User/UserJobRegModel');

module.exports = {


    adminlogin: async (req, res) => {



        pass = await bcrypt.hash(req.body.password, 10)

        const isAdmin = await Admin.findOne({ email: req.body.email })
        const AdminStatus = await bcrypt.compare(req.body.password, isAdmin.password)

        let Adminstatus = false

        if (AdminStatus) {
            Adminstatus = true
        } else {
            Adminstatus

        }

        if (Adminstatus) {
            const token = jwt.sign({ admin: req.body.email }, process.env.SECRET_KEY, { expiresIn: '500000' });

            res.json({
                status: "success",
                message: "admin verified",
                token,
                Adminlogged: true

            })
        } else {
            res.json({
                Adminlogged: false
            })
        }


    }




    ,
    addminorservice: async (req, res) => {


        return new Promise((resolve, reject) => {
            const obj = {
                title: req.body.title,
                Content: req.body.Content,
                serviceType: 'Minorchecklist'
            }

            const addservice = new Adminservice(obj)
            addservice.save()

        }).then(() => {
            resolve(true)
            res.json({

            })
        })





    },
    minorservicelist: async (req, res) => {
        try {
            const servicelist = await Adminservice.find({ 'serviceType': 'Minorchecklist' })
            console.log(servicelist);
            res.json({
                minorservices: servicelist
            })

        }
        catch (err) {

            console.log(err);
        }


    },

    addnormalservice: async (req, res) => {
        try {
            const obj = {
                title: req.body.title,
                Content: req.body.Content,
                serviceType: 'Normalchecklist',
                status: 'Recieved',
            }
            const addservice = new Adminservice(obj)
            addservice.save();

        }
        catch (err) {

            console.log(err);
        }




    },
    normalservicelist: async (req, res) => {
        try {
            const servicelist = await Adminservice.find({ 'serviceType': 'Normalchecklist' })

            res.json({
                normalservices: servicelist
            })
        }
        catch (err) {

            console.log(err);
        }

    },
    minordelete: async (req, res) => {
        try {

            const servicelist = await Adminservice.find({ 'serviceType': 'Minorchecklist' })
            if (servicelist) {
                req.body.map(async (id) => {

                    await Adminservice.deleteOne({ _id: id })

                })

            }

        }
        catch (err) {

            console.log(err);
        }


    },

    normaldelete: async (req, res) => {

        try {
            const servicelist = await Adminservice.find({ 'serviceType': 'Normalchecklist' })
            if (servicelist) {
                req.body.map(async (id) => {

                    await Adminservice.deleteOne({ _id: id })

                })

            }


        } catch (err) {

            console.log(err);
        }




    },
    majorservicelist: async (req, res) => {
        try {
            const servicelist = await Adminservice.find({ 'serviceType': 'Majorchecklist' })


            if (!servicelist) {
                res.json({
                    normalservices: ["No service Added"]
                })
            } else {

                res.json({
                    normalservices: servicelist
                })
            }

        } catch (err) {

            console.log(err);
        }



    },
    addmajorservice: (req, res) => {
        try {
            const obj = {
                title: req.body.title,
                Content: req.body.Content,
                serviceType: 'Majorchecklist'
            }

            const addservice = new Adminservice(obj)
            addservice.save();

        } catch (err) {

            console.log(err);
        }





    },
    majordelete: async (req, res) => {
        try {
            const servicelist = await Adminservice.find({ 'serviceType': 'Majorchecklist' })
            if (servicelist) {
                req.body.map(async (id) => {

                    await Adminservice.deleteOne({ _id: id })
                    res.json({
                        message: "service deleted"
                    })

                })

            }

        } catch (err) {

            console.log(err);
        }


    },

    getemployee: async (req, res) => {

        try {
            const Employeelist = await EmployeeData.find()
            res.json({
                employeelist: Employeelist
            })

        } catch (err) {

            console.log(err);
        }




    },

    employeereg: async (req, res) => {

        emailSender(req.body)
        try {
            req.body.Password = await bcrypt.hash(req.body.Password, 10)
            const isEmployee = await EmployeeData.findOne({ 'Username': req.body.Username })

            if (!isEmployee) {


                const emp = new EmployeeData(req.body)
                emp.save()

                res.json({
                    empadd: false
                })
            } else {
                res.json({
                    empadd: true
                })

            }

        } catch (err) {

            console.log(err);
        }


    },
    empdelete: async (req, res) => {
        try {
            const empdel = await EmployeeData.deleteOne({ _id: req.params.id })
            console.log(empdel, "deleted emp");
        } catch (err) {
            console.log(err);
        }
    },


    empstatusupdate: async (req, res) => {
        try {
            const isEmployee = await EmployeeData.findOneAndUpdate({ _id: req.body.empid }, { Availability: req.body.status })

            res.json({
                resp: true
            })

        }

        catch (err) {

            console.log(err);
        }


    },
    leavelist: async (req, res) => {
        return new Promise(async (resolve, reject) => {
            const list = await Empleave.find()


            res.json({
                list
            })

        })
    },
    sendmail: async (req, res) => {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let message = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({
                msg: "mail sended"
            })
        })


        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    },

    empChangePass: async (req, res) => {

        password = await bcrypt.hash(req.body.password, 10)

        try {
            newmob = req.body.Mob.slice(3)
            console.log("new mobasda", newmob);
            const isEmployee = await EmployeeData.findOneAndUpdate({ Mob: newmob }, { Password: password })
            if (isEmployee) {

                res.status(200).json({
                    change: true,
                    message: "Password Changed Succesfully"
                })
            } else {
                res.status(400).json({
                    change: false,
                    message: "Employee Not Found"
                })
            }

        }
        catch (err) {
            console.log(err);

        }



    },
    customerEstimation: async (req, res) => {


        try {





            const reg = await UserJob.findOneAndUpdate({ "userId": req.body.userid }, { "jobstatus": req.body.products })
            await UserJob.findOneAndUpdate({ "userId": req.body.userid }, { "total": req.body.tot })
            await UserJob.findOneAndUpdate({ "_id": req.body.jobid }, { "Status": "Estimation Generated" })
            await UserJob.findOneAndUpdate({ "_id": req.body.jobid }, { "Estimation": true })

        } catch (err) {
            console.log(err);
        }

    },
    nonallocated: async (req, res) => {
        try {
            const Nonallocated = await UserJob.find({}).where({
                'Approved': false,
            })
            res.status(200).json({
                data: Nonallocated
            })

        } catch (err) {

        }
    },
    Allchecks: async (req, res) => {
        try {
            const aggregatorOpts = [{
                $group: {
                    _id: "$serviceType",
                    count: { $sum: 1 }
                }
            }]
            const data = await UserJob.aggregate(aggregatorOpts).exec()

            if (data) {
                res.status(200).json({
                    data,
                    found: true
                })
            } else {
                res.status(404).json({

                    found: false
                })
            }
        } catch (err) {
            console.log(err);
        }
    },
    jobstatuscheck: async (req, res) => {
        try {
            const aggregatorOpts = [{
                $group: {
                    _id: "$Status",
                    count: { $sum: 1 }
                }
            }]
            const data = await UserJob.aggregate(aggregatorOpts).exec()

            if (data) {
                res.status(200).json({
                    data,
                    found: true
                })
            } else {
                res.status(404).json({

                    found: false
                })
            }
        } catch (err) {
            console.log(err);
        }
    },
    jobcategory: async (req, res) => {
        try {
            const aggregatorOpts = [{
                $group: {
                    _id: "$Category",
                    count: { $sum: 1 }
                }
            }]
            const data = await UserJob.aggregate(aggregatorOpts).exec()

            if (data) {
                res.status(200).json({
                    data,
                    found: true
                })
            } else {
                res.status(404).json({

                    found: false
                })
            }
        } catch (err) {
            console.log(err);
        }
    },




}




