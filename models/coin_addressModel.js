
const mongoose = require("mongoose")

const coin_addressSchema = mongoose.Schema({
    coin_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        default: 'sanju'
    },
    public_address:{
        type:String,
        required:true
    },
    private_address:{
        type:String,
        required:true
    },
    status: { type: Number, default: 0 },
    
},{timestamps:true})

const coin_addressModel = mongoose.model("coin_address",coin_addressSchema)


module.exports = coin_addressModel