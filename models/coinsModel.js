
const mongoose = require("mongoose")

const coinsSchema = mongoose.Schema({
    coin_name:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    decn_sent_api:{
        type:String,
        required:true
    },
    cent_sent_api:{
        type:String,
        required:true
    },
    currency:  {
         type: String,
         required:true
     },
    status: { type: Number, default: 0 },
    
},{timestamps:true})

const coinsModel = mongoose.model("coins",coinsSchema)


module.exports = coinsModel