const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  user_id:{type:String},
  name:{type:String},
  email: { type: String },
  password: { type: String },
  public_addr: { type: String },
  mobile: { type: String },
  status: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  type:{type:String, default:'user'}
});


const User = mongoose.model('User', UserSchema);


module.exports = User;
