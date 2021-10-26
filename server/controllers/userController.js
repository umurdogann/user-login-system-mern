const bcrypt = require("bcryptjs");
const userService = require("../services/userService");



const register = async (req, res) => {
  const { userName, password } = req.body;
  
  if (!userName || !password)
    return res.status(400).send({ message: "Username or password invalid" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  await userService.register(req.body, (error, result) => {
    if (error) return res.status(400).send(error);
    return res.status(201).send(result);
  });
};

const login = async (req, res)=>{
    const {userName, password} = req.body;
    if(!userName || !password) return res.status(400).send({message: "Username or password invalid"});
    await userService.login(req.body, (error, result) => {
        if(error) return res.status(400).send(error);
        return res.status(200).send(result);
    })
}



module.exports = {
  login,
  register,
};
