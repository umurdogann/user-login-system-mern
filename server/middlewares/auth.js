const jwt = require("jsonwebtoken");

const generateToken = (id, userName) => {
  return jwt.sign({ id, userName }, "veryveryverysecret@.!'^+%", {
      expiresIn: "1d",
  });
};
const authentication = (req, res, next) => {
    const authorization = req.headers['Authorization'];
    const token = authorization.split(" ")[1];
    try {
        const {id, userName} = jwt.verify(token,"veryveryverysecret@.!'^+%");
        req.body.user = {id, userName};
        next();
    } catch (error) {
        res.status(401).send({message: "Invalid token!"});
    }
};

module.exports = {
  authentication,
  generateToken,
};
