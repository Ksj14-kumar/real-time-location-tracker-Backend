const mongoose = require("mongoose")
const URI= process.env.URL || "mongodb://localhost:27017/visitors"
mongoose.connect(URI, (err) => {
    if (err) {
        console.log(err)
        console.log("not connected to db")
    }
    else {
        console.log("connected to db")
    }
})