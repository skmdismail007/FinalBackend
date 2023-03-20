const Transaction = require("../models/transactionsModel");

const ethTx = require("ethereumjs-tx").Transaction;
const RLP = require("rlp");

// @description Get all profile
//@route GET /api/transactions
// @access public

const getTransactions = async (req, res) => {
  await Transaction.find()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
    });
};

//// transaction code

const txData = {
  nonce: "0x2",
  gasprice: "0x09184e72e000",
  gaslimit: "0x2710",
  to: "0x3ef4e92a84b961d783cDFaD6610411e31900670f",
  value: "0x02",
  data: "0x7f746573743200000000000000000000000000000000000000000000000000000000000000057",
};

const tx = new ethTx(txData);
console.log("RLP-Encoded Tx:0x" + tx.serialize().toString("hex"));
txHash = tx.hash();
console.log("Tx Hash :0x " + txHash.toString("hex"));
const privkey = Buffer.from(
  "239abcc3d3743560f5df85eac1cf01f078afbc561ca45d1ce1dfe8e8af4f5e85",
  "hex"
);
tx.sign(privkey);
serializedTx = tx.serialize();
rawTx = "signed Raw Transaction : 0x" + serializedTx.toString("hex");
console.log(rawTx);

//const rawTxHex = tx.serialize();
const rawTxHex = serializedTx;
// const rlp = require('rlp')
// const decoded = rlp.decode(rawTxHex)
// console.log(decoded);

const ethers = require("ethers");
const decoded = ethers.utils.RLP.decode(rawTxHex);
console.log(decoded);

// @description Get all profile
//@route POST /api/transactions
// @access public

const postTransactions = async (req, res) => {
  const createTransaction = await Transaction.create({
    frm_user_id: decoded[6],
    rcv_user_id: decoded[3],
    amount: decoded[4],
    currency: "bitcoin",
    frm_user_addr: decoded[8],
    rcv_user_addr: decoded[7],
  });
  res.status(200).json(createTransaction);
};

module.exports = { getTransactions, postTransactions };
