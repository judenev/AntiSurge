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
const Admin = mongoose.model("admin", AdminSchema)
module.exports = { Admin}