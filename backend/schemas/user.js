const mongoose = require('mongoose')
const Userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    },
    jobId:{
        type :[String],
    }


})
const Userjobreg =  new mongoose.Schema({
    serviceType:{
        type:String,
        required:true
    },
    Approved:{
        type:Boolean,
        required:true
    },
    Category:{
        type:String,
        required: true

    },
    Estimate:{
        type:String,
        required:true
    },
    Instruction:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    Status :{
        type:String,
        required:true
    },
   
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    jobstatus:{
        type:[{}],
        required:true

    }
  




 })
const User = mongoose.model("user", Userschema)
const UserJob =mongoose.model("UserJob",Userjobreg)
module.exports = { User,UserJob }