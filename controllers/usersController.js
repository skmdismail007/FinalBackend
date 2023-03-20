const User = require("../models/usersModel")

// Admin  

    
// @description create profile
//@route POST /api/Users_for_admin
// @access public

const createUsers_for_admin = async (req,res)=>{
    console.log(req.body)
    const {email,
        password,
        mobile,
       
    } = req.body
    if (!email || !password || !mobile ) {
        console.log("empty field")
    }else{
      const createUser =  await User.create({
        email,
        password,
        mobile,
        type:"ADMIN"
        
        })
    res.status(200).json(createUser)
    }
}

// @description Get all profile
//@route GET /api/Users_for_admin
// @access public

const getUsers_for_admin = async (req,res)=>{
    await User.find({}).then(()=>{
        res.json(data)
    })
    
     
    }
/// end Admin  



// @description Get all profile
//@route GET /api/users
// @access public

const getUsers = async (req,res)=>{
    await User.find({}).then(()=>{
        res.json(data)
    })
    
     
    }

    // @description create profile
    //@route Get /api/users/:id
    // @access public
    
    const Get_by_user_id_details = async (req,res)=>{
        
        const id= req.params.id 
        await User.find({"user_id":id})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
        console.log(err)
        })
    }


// @description create profile
//@route POST /api/users
// @access public

const createUsers = async (req, res) => {
    const { user_id, name, email, password, public_addr, mobile } = req.body;
    
    if (!user_id || !name || !email || !password || !mobile) {
      console.log("empty field");
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // check if user exists
 const checkEmail =  await User.findOne({"email":email})
if(!checkEmail){

        //insert details
        await User.create({
                                user_id,
                                name,
                                email,
                                password,
                                public_addr,
                                mobile
                            })
        res.status(200).json({message:"Details are submitted"})
}
return res.status(404).json({message:"details already added"})      
       

  
   
  };
  
module.exports = {createUsers_for_admin,getUsers_for_admin,Get_by_user_id_details,createUsers,getUsers,Get_by_user_id_details}












