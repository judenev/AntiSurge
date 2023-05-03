// const MongoClient = require('mongodb').MongoClient
// const state = {
//     db: null
// }
// module.exports.connect = function (finished) {
//     const url = 'mongodb://localhost:27017'
//     const dbname = 'Antisurge'

//     MongoClient.connect(url, (err, data) => {

//         if (err) return finished(err)
//         state.db = data.db(dbname)

//         finished()
//     })


// }
require('dotenv').config()
const mongoose = require('mongoose')

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        mongoose.connect("mongodb://localhost:27017/Antisurge", connectionParams)
        console.log('database Connected');
    } catch (error) {
        console.log(error);
        console.log('Could not connected to database..');
    }
}