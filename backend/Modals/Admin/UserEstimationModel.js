const mongoose = require('mongoose')
const EstimationSchema=new mongoose.Schema({
    products:{
        type:[{}],
        required:true
    },
    tot:{
        type:Number,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    jobid:{
        type:String,
        required:true
    }

})
const UserEstimation =mongoose.model("UserEstimation",EstimationSchema)
module.exports ={UserEstimation}