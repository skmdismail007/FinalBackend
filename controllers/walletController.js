const Wallet = require("../models/walletModel")


// @description Get all wallet per user
//@route GET /api/coin/user/wallet/:coinId/:userId
// @access public

const getWallet = async (req,res)=>{
    const coinId= req.params.coinId
    const userId = req.params.userId 
    
await Wallet.find({"coin_id":coinId,"user_id":userId})
.then((profiles)=>{
    res.status(200).json(profiles)
})
.catch((err)=>{
console.log(err)
})
  
}

// @description create wallet per user
//@route POST /api/coin/user/wallet/:coinId/:userId
// @access public

const createWallet = async (req,res)=>{
    const coinId= req.params.coinId
    const userId = req.params.userId 
    
    const checkWallet = await Wallet.findOne({ coin_id: coinId, user_id: userId});
    if (!checkWallet) {
        const createWallet =  await Wallet.create({
       
            coin_id:coinId,
            user_id:userId,
           
            
            })
        res.status(200).json(createWallet)
    }
    return res.status(404).json({message:"wallet already added"}) 
    
    
}

module.exports = {getWallet,createWallet}