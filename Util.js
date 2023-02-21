const Users = require("./db/VisitorSchema")
class Util {
    constructor() {
        this.allUsers = {}
    }
    DeleteUser(sid) {
        delete this.allUsers[sid]
        return this.allUsers
    }
    async addUser(sid, params) {
        try {
            const res = await Users({ visitors: { sid: params } })
            await res.save()
            this.allUsers[sid] = params
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}
module.exports = new Util()
