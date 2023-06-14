const mongoose = require('mongoose')
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
    Mob:{
        type:String,
        required:true
    },
    Content: {
        type: String,
        required: true
    },
    Qualifications: {
        type: String,

    },
    AttendingJobs: {
        type: [{}],
        

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
const EmployeeData = mongoose.model("employee", employeeSchema)
module.exports = {EmployeeData}