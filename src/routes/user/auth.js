const exress = require("express");
const router = exress.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequrestValidated,
} = require("../../validation/auth");
const { signup, signin,signout } = require("../../controller/user/auth");

router.post("/signup", validateSignUpRequest, isRequrestValidated, signup);

router.post("/signin", validateSignInRequest, isRequrestValidated, signin);
router.post("/signout", signout);


// router.post("/admin/profile", requireProfile, (req, res) => {
//   return res.status(200).json({
//     message: "Profile",
//   });
// });

module.exports = router;
