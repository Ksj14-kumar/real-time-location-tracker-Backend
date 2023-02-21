const Util = require("../Util")
module.exports = (server) => {
    const io = require("socket.io")(server, {
        path: "/visitor",
        transports: ['websocket'],
        cors: {
            origin: process.env.UI_URI
        }
    })
    const visitor_nsp = io.of("/visitors")
    visitor_nsp.on("connection", (socket) => {
        console.log(socket)
        console.log("a user is connected")
        socket.on("info", (params) => {
            const res = Util.addUser(socket.id, params)
            if (res) {
                console.log({ params })
                console.log({all: Util.allUsers })
                visitor_nsp.emit("all", Object.values(Util.allUsers))
            }
        })
        socket.on("disconnect", () => {
            const removeUser = Util.DeleteUser(socket.id)
            console.log(" a user is disconnecte")
            if (removeUser) {
                visitor_nsp.emit("all", Object.values(removeUser))
            }
        })
    })
}