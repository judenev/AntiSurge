const mongoose = require('mongoose')
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
    Applied:{
   type:Boolean
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

    },
    total:{
        type:Number,
        
    },
    Estimation:{
        type:Boolean
    },
    Warranty:{
        type:Boolean
    },
    WarrantyDate:{
        type:String
    },
    Attended:{
        type :String
    },
    JobId:{
        type:String
    },
    completed:{
        type:Boolean
    }
  




 })
 const UserJob =mongoose.model("UserJob",Userjobreg)
 module.exports = { UserJob }