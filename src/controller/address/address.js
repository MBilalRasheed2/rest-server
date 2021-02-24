const AddressSchema = require("../../models/address");
exports.addUserAddress = (req, res) => {
 
  const UserId = req.user._id;
 const {UserAddress}=req.body.payload;

  if (UserAddress) {
    AddressSchema.findOneAndUpdate(
      { user: UserId },
      {
        "$push": {
          "address": UserAddress,
        },
      },
      { new: true, upsert: true }
    ).exec((err, address) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (address) {
        return res.status(200).json({
          address,
        });
      }
    });
  } else {
    return res.status(400).json({
    error:"address is required"
    });
  }
};

exports.getUserAddress = (req, res) => {
  AddressSchema.findOne({user:req.user._id}).exec((err,useraddress)=>{
    if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (useraddress) {
        return res.status(200).json({
            useraddress,
        });
      }
  })
  };
