const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
  
  frm_user_id: { type: Number },
  rcv_user_id: { type: Number },
  amount: { type: String },
  currency: { type: String },
  frm_user_addr: { type: String },
  rcv_user_addr: { type: String },
  status: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});


const Transaction = mongoose.model('Transaction', TransactionSchema);


module.exports = Transaction;
