
const mongoose = require("mongoose")
const Schema = new mongoose.Schema({
    visitors: [Object]
})
module.exports = new mongoose.model("visitors", Schema)