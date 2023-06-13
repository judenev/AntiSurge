var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { User } = require('../Modals/User/UserSchemaModel')
const { UserJob } = require('../Modals/User/UserJobRegModel')
const { EmployeeData } = require('../Modals/Admin/EmployeeRegSchemaModal')
const axios = require('axios')
module.exports = {

    userReg: async (req, res) => {
        return new Promise(async (resolve, reject) => {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            req.body.confirmpassword = ''

            const newUser = new User(req.body)

            const isEmail = await User.findOne({ 'email': req.body.email })


            if (isUser) {


                if (isUser.firstName == req.body.firstName && isUser.lastName == req.body.lastName) {
                    if (isUser.email == req.body.email) {

                        resolve({ email: true })
                    } else {
                        newUser.save()
                        resolve({ user: true })
                    }
                } else {
                    if (isEmail) {

                        resolve({ email: true })
                    } else {
                        newUser.save()
                        resolve({ email: false })

                    }

                }
            } else {

                if (!isEmail) {

                    newUser.save()
                    resolve({ user: false })
                } else {

                    resolve({ email: true })
                }



            }
        }).then((resp) => {

            if (resp.user) {
                res.json({
                    user: true,
                    email: false

                })
            } else {
                if (resp.email) {
                    res.json({
                        email: true

                    })
                } else {
                    res.json({
                        email: false,
                        user: false

                    })
                }
            }

        })
    },

    userLogin: async (req, res) => {
        return new Promise(async (resolve, reject) => {

            const userdata = await User.findOne({ email: req.body.email })
            if (userdata) {

                const isUser = await bcrypt.compare(req.body.password, userdata.password)
                if (isUser) {
                    const usedata = {
                        user: true,
                        data: userdata
                    }
                    resolve(usedata)
                } else {
                    resolve(user = false)
                }
            } else {
                resolve(user = false)
            }

        }).then((resp) => {

            if (resp.user) {
                const token = jwt.sign({ user: req.body.email }, process.env.SECRET_KEY, { expiresIn: '500000' });
                res.json({
                    token,
                    userverified: true,
                    data: resp.data
                })

            } else {
                res.json({
                    userverified: false
                })
            }
        })
    },
    Userjobreg: async (req, res) => {

        try {
            const isJob = await UserJob.find({ userId: req.body.userId })
            let count = 0
            if (!isJob.length == 0) {
                const report = await UserJob.find({ Model: req.body.Model, serviceType: req.body.serviceType })

                if (report[0]) {

                    res.json({ repeat: true })
                } else {

                    let arr = []
                    req.body.joblist.map((job) => {
                        arr.push(
                            {
                                "title": job,
                                "status": "Recieved"
                            }
                        )

                    })

                    req.body.jobstatus = arr
                    const UserjobRegistration = new UserJob(req.body)
                    UserjobRegistration.save().then(async (resp) => {

                        const d = ("" + resp.userId)
                        const jobIdslice = (d.slice(20) + resp.Model)

                        await UserJob.findOneAndUpdate({ _id: resp._id }, { "JobId": jobIdslice })
                        res.json({
                            Repeat: false
                        })
                    })
                }

            } else {



                let arr = []
                req.body.joblist.map((job) => {
                    arr.push(
                        {
                            "title": job,
                            "status": "Recieved"
                        }
                    )

                })

                req.body.jobstatus = arr
                const UserjobRegistration = new UserJob(req.body)
                UserjobRegistration.save().then(async (resp) => {

                    const d = ("" + resp.userId)
                    const jobIdslice = (d.slice(20) + resp.Model)

                    await UserJob.findOneAndUpdate({ _id: resp._id }, { "JobId": jobIdslice })
                    res.json({
                        Repeat: false
                    })
                })

            }


        } catch (err) {
            console.log(err);
        }



    },
    getNonallocated: async (req, res) => {
        try {
            const Nonallocated = await UserJob.find()

            res.json({
                data: Nonallocated
            })
        } catch (err) {

        }
    }
    ,
    estimatecal: async (req, res) => {
        try {
            const isJob = await UserJob.findOne({ _id: req.params.id })
            if (isJob) {
                res.json({
                    data: isJob,
                    found: true
                })

            } else {

                console.log(isJob);
                res.status(404).json({
                    found: false,
                    message: "user not found"
                })
            }

        } catch (err) {

        }

    },
    EstApproval: async (req, res) => {
        const isUser = await UserJob.find({ userId: req.params.id })
        if (isUser) {
            res.status(200).json({
                data: isUser,
                order: true
            })
        } else {
            res.status(404).json({
                order: false
            })

        }


    },
    Approved: async (req, res) => {

        const done = await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Status": "Approved" })
        await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Approved": false })
        await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Applied": true })
        await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Estimation": false })
        if (done) {
            res.status(200).json({
                status: true
            })
        } else {
            res.status(404).json({
                status: false
            })
        }
        const leastJobAttending = await EmployeeData.aggregate([
            {
                $addFields: {
                    size: { $size: "$AttendingJobs" }
                }
            },
            {
                $sort: { size: 1 }
            },
            {
                $limit: 1
            }
        ])
        const JobData = {
            id: req.body.JobId
        }
        const empd = leastJobAttending[0]._id
        await EmployeeData.updateOne({ _id: empd }, { $push: { AttendingJobs: JobData } })

        const EmpData = await EmployeeData.findOne({ _id: empd })

        await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Attended": EmpData.Name })


    },
    Reject: async (req, res) => {
        const done = await UserJob.findOneAndUpdate({ _id: req.params.id }, { "Status": "Not Approved" })
        if (done) {
            res.status(200).json({
                status: true
            })
        }

    },

    auth: async (req, res) => {

        const { username } = req.body;
        try {
            const KEY = process.env.CHATENGINE_PRIVATE_KEY
            console.log("KEY", KEY);
            const r = await axios.put(
                "https://api.chatengine.io/users/",
                { username: username, secret: username, first_name: username },
                { headers: { "Private-Key": '16438858-333c-4aad-bdc9-74d488ff9f46' } }
            );
            console.log("status", r);
            return res.status(r.status).json(r.data);
        } catch (e) {
            return res.status(e.response.status).json(e.response.data);
        }

    }
}