const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const fs= require("fs")
const utl=require("util")
const path= require("path")
const port = process.env.PORT || 5000
const server = require("http").createServer(app)
require("./db/db")
app.use(express.static(path.join(__dirname,"view")))
require("./Socket/connection")(server)
// app.use("*",(req, res)=>{
//     return res.sendFile(path.join(__dirname,"index.html"))
// })
console.log = function (d) {
    fs.createWriteStream(path.join(__dirname, "/log.log"), { flags: "a" }).write(utl.format(d) + "\n")
    process.stdout.write(utl.format(d) + "\n")
}
mongoose.connection.once("open", (err) => {
    if (err) {
        console.log({err})
        console.log("not connect")
        return
    }
    else {
        server.listen(port, (err) => {
            if (err) {
                console.log("server is not start", err)
            }
            console.log(`server is start at ${port}`)
        })
    }
})