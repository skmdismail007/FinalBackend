const coinsModel = require("../models/coinsModel")


// @description Get all coins
//@route GET /api/coins
// @access public

const getCoins = async (req,res)=>{
await coinsModel.find()
.then((profiles)=>{
    res.status(200).json(profiles)
})
.catch((err)=>{
console.log(err)
})
  
}

// @description create coin
//@route POST /api/coins
// @access public

const createCoins = async (req,res)=>{
    console.log(req.body)
    const {coin_name,logo,decn_sent_api,cent_sent_api,currency} = req.body
    if (!coin_name || !logo || !decn_sent_api || !cent_sent_api || !currency ) {
        console.log("empty field")
    }else{
      const createCoinModel =  await coinsModel.create({
        coin_name,
        logo,
        decn_sent_api,
        cent_sent_api,
        currency
        
        })
    res.status(200).json(createCoinModel)
    }
}
// @description update coin details per coinId
//@route PUT /api/coins
// @access public

const updateCoins = async (req, res) => {
    const id = req.params.id
    const { coin_name, logo, status, decn_sent_api, cent_sent_api,currency } = req.body;
  
    try {
      const result = await coinsModel.updateOne(
        { _id: id },
        { $set: { coin_name, logo, status, decn_sent_api, cent_sent_api,currency } }
      );
  
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

module.exports = {getCoins,createCoins,updateCoins}