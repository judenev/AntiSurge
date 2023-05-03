let db = require('../utils/connections')
let collection = require('../utils/collection')
const { User, UserJob } = require('../schemas/user')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
module.exports = {

    userReg: async (req, res) => {
        return new Promise(async (resolve, reject) => {
            data.password = await bcrypt.hash(req.body.password, 10)
            data.confirmpassword = ''
            console.log('after hashing', data);
            const newUser = new User(data)

            let isUser = await User.findOne({ 'firstName': req.body.firstName })
            let isEmail = await User.findOne({ 'email': req.body.email })
            console.log("user already here", isUser, isEmail);

            if (isUser) {
                console.log("user alreadt found checking");

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
                console.log("new User Registered");
                if (!isEmail) {

                    newUser.save()
                    resolve({ user: false })
                } else {
                    console.log("kppi");
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

            let userdata = await User.findOne({ email: req.body.email })
            if (userdata) {

                let isUser = await bcrypt.compare(req.body.password, userdata.password)
                if (isUser) {
                    let usedata = {
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
            console.log("userauth", resp);
            if (resp.user) {
                const token = jwt.sign({ user: req.body.email }, process.env.SECRET_KEY, { expiresIn: '50000' });
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
        console.log(req.body);
        try {
            const isJob = await UserJob.find({ userId: req.body.userId })
            let count = 0
            if (!isJob.length == 0) {
                const report = await UserJob.find({ Model: req.body.Model, serviceType: req.body.serviceType })
                console.log("fdfsdf", report[0]);
                if (report[0]) {
                    console.log("my");
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
                        // jobstatus["title"] = job,
                        //     jobstatus["status"] = "Recieved"
                    })
                    console.log("hhhhhhh", arr);
                    // req.body.jobstatus = jobstatus
                    const UserjobRegistration = new UserJob(req.body)
                    UserjobRegistration.save().then((resp) => {
                        res.json({
                            Repeat: false
                        })
                    })
                }

            } else {
                let jobstatus = {
                    //'painting': 'received'
                }

                req.body.joblist.map((job) => {


                    jobstatus[job] = "Recieved"
                })
                const UserjobRegistration = new UserJob({ ...req.body, jobstatus })
                UserjobRegistration.save().then((resp) => {
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

    }
}