const coin_addressModel = require("../models/coin_addressModel")
const coinsModel = require("../models/coinsModel")
const fs = require('fs');
const xlsx = require('xlsx');

// @description Get all profile
//@route GET /api/coins/coins_address
// @access public

const getCoin_address = async (req,res)=>{
    await coin_addressModel.find()
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
    console.log(err)
    })
       
    }
    
    // @description create profile
    //@route POST /api/coins/coins_address/:id
    // http://localhost:5001/api/coins/coins_address/63f857b35d0330c056050c77
    // @access public
   

    const createCoin_address = async (req,res)=>{
        
      const id = req.params.id;
      const filePath = req.file.path.replace(/\\/g, '/');
        //const filePath = '../../xl_files/';
       
      
        let rows = [];
      
        if (filePath.endsWith('.csv')) {
          const data = fs.readFileSync(filePath, 'utf-8');
          rows = data.trim().split('\n').map(line => line.trim().split(','));
          const headers = rows.shift();
          rows = rows.map(values => headers.reduce((obj, key, i) => ({ ...obj, [key]: values[i] }), {}));
        } else if (filePath.endsWith('.xlsx')) {
          const workbook = xlsx.readFile(filePath);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          rows = xlsx.utils.sheet_to_json(worksheet);
        } else {
          res.sendStatus(400);
          return;
        }
      
        const documents = rows.map(row => ({
          coin_id: id,
          public_address: row.public_address,
          private_address: row.private_address
        }));
      
        try {
          await coin_addressModel.insertMany(documents);
          res.sendStatus(200);
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        } 
        finally {
          fs.unlinkSync(filePath);
        }

    }

// @description create per coinId wise coin_address
    //@route Get /api/coins/coins_address/:id
    // @access public
    
    const Get_by_Coin_idCoin_address = async (req,res)=>{
        
        const id= req.params.id 
        await coin_addressModel.find({"coin_id":id})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
        console.log(err)
        })
    }

    // @description create per coinId wise coin_address user update
    //@route put /api/coins/coins_address/:coinId/:userId/:coin_addressId
    // @access public
    
   

    const Get_by_Coin_idCoin_address_user_update = async (req, res) => {
      const coinId = req.params.coinId;
      const userId = req.params.userId;
      const coin_addressId = req.params.coin_addressId;
      
     
    
      try {
        const coin_address = await coin_addressModel.findOne({ coin_id: coinId, user_id: userId, _id: coin_addressId });
        console.log(coin_address)
        if (!coin_address) {
          const result = await coin_addressModel.updateOne(
            { $and: [{ coin_id: coinId }, { _id: coin_addressId }] },
            { $set: { "user_id":userId } }
          );
      
          res.status(200).send({message:"added"});
        } else {
          return res.status(404).send({message:'Already added'});
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({message:'Server Error'});
      }
    }
    
    
    
    module.exports = {getCoin_address,createCoin_address,Get_by_Coin_idCoin_address,Get_by_Coin_idCoin_address_user_update}