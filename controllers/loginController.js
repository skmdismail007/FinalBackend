const User = require("../models/usersModel")


// @description create profile
//@route POST /login
// @access public    only for admin

const fetchUser = async (req, res) => {
    const { email, password } = req.body;
  
    // check if user exists
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(500).send({ error: 'Internal server error' });
        return;
      }
      if (!user) {
        res.status(401).send({ error: 'User not found' });
        return;
      }
  
      // check if password matches
      if (user.password !== password) {
        res.status(401).send({ error: 'Incorrect password' });
        return;
      }
  
      // user is authenticated, send response
      res.status(200).send({ message: 'Login successful' });
    });
  }

module.exports = {fetchUser}


