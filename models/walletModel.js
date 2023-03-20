const mongoose = require('mongoose');


const WalletSchema = new mongoose.Schema({
  
  user_id: { type: String },
  coin_id: { type: String },
  balance: { type: String, default: '0' },
  created_at: { type: Date, default: Date.now }
});


const Wallet = mongoose.model('Wallet', WalletSchema);


module.exports = Wallet;
