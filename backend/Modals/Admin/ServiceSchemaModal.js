
const mongoose = require('mongoose')
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
const Adminservice = mongoose.model("adminservice", serviceSchema)
module.exports = {Adminservice}