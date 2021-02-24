const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (user) {
      return res.status(400).json({
        message: "admin is already registered",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      hashed_password,
      userName: Math.random().toString(),
      role: "admin",
    });

    newUser.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(200).json({
          user: "admin is created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).exec(async (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
    if (user)
     {
      const { hashed_password } = user;
      const checkPass = await bcrypt.compare(password, hashed_password);
     

      if (checkPass && user.role === "admin") {
        const token = jwt.sign({ _id: user._id, role:user.role }, process.env.SCRET, {
          expiresIn: "1h",
        });

        const { firstName, email, lastName, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "something went wrong please check your password",
        });
      }
    }else{
      return res.status(400).json({
        message: "something went wrong ",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
