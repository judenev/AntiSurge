const mongoose = require('mongoose')
const ChangePass= new mongoose.Schema({

    password:{
        type:String,
        required:true

    }
})