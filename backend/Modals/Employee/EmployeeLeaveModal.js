const mongoose = require('mongoose')
const EmpleaveSchema =new mongoose.Schema({
    FromDate:{
        type:String,
        required:true
    },
    ToDate:{
        type:String,
        required:true
    },
 
    Days:{
        type:Number,
        required:true
    },
    Reason:{
        type:String,
        required:true
      
    },
    empid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'employee'
    },
    type:{
        type:String,
        required:true,
    },
    empname:{
       type:String,
       required:true 
    },
    Approved:{
        type:Boolean,
        required:true
    }

})

const Empleave =mongoose.model("empleave",EmpleaveSchema)

module.exports ={Empleave}