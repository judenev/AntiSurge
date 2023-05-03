const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,

    },

})

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true

    },
    serviceType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required:true
    },

})
const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    Qualifications: {
        type: String,

    },
    AttendingJobs: {
        type: Array

    },
    NumberOfJobs: {
        type: Number
    },
    Availability: {
        type: Boolean,

    },
    Leave: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empleave'
    }]

})
const Admin = mongoose.model("admin", AdminSchema)
const Adminservice = mongoose.model("adminservice", serviceSchema)
const EmployeeData = mongoose.model("employee", employeeSchema)
module.exports = { Admin, Adminservice, EmployeeData }