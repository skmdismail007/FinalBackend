const mongoose = require('mongoose');


const TransConfigSchema = new mongoose.Schema({
  send_comm: { type: String, default: '0' },
  sale_comm: { type: String, default: '0' }
});


const TransConfig = mongoose.model('TransConfig', TransConfigSchema);


module.exports = TransConfig;
