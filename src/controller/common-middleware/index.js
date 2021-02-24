const jwt = require("jsonwebtoken");

exports.requireProfile = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SCRET);
    req.user = user;
    
  } else {
    return res.status(400).json({
      message: "authoriztion is required",
    });
  }
  next();
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "access is  denied",
    });
  }
  next();
};
exports.userMiddleware = (req, res, next) => {
  console.log({user:req.user.role});
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    console.log({user:req.user.role});
    next();
  };
