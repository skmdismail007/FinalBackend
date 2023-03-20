const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.connection_string)
        console.log(
        "database connectected",
        connect.connection.host,
        connect.connection.name
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDb