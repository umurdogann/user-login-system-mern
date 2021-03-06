const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const register = async (data, callback) => {
  const newUser = new userModel(data);
  newUser
    .save()
    .then(() => {
      return callback(false, {
        message: "The user has been successfully created.",
      });
    })
    .catch((error) => {     
      return callback({message : "This username already in use!"});
    });
};

const login = async ({userName, password}, callback) =>{
    const user = await userModel.findOne({userName})
    if(!user) return callback({message: "Username is wrong!"});      
   if(bcrypt.compareSync(password, user.password)){
     const token = auth.generateToken(user._id, user.userName);
     return callback(false,{...user.toJSON(), token});
   }else{
    return callback({message: "Password is wrong!"});
   }

}

module.exports = {
  register,
  login
};
