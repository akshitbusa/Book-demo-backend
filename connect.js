const mongoose = require('mongoose');

//connection and database
mongoose.connect("mongodb://0.0.0.0:27017/bookdetails")
    .then(() => { console.log("connection succesfull") })
    .catch((e) => console.log(e))


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },

})

const Allbooks = mongoose.model("Allbooks",bookSchema)
module.exports = Allbooks
