const exress = require("express");
const router = exress.Router();
const {
  validateSignUpRequest,
  validateSignInRequest,
  isRequrestValidated,
} = require("../../validation/auth");
const { signup, signin, signout } = require("../../controller/admin/auth");

router.post(
  "/admin/signup",
  validateSignUpRequest,
  isRequrestValidated,
  signup
);

router.post(
  "/admin/signin",
  validateSignInRequest,
  isRequrestValidated,
  signin
);

router.post("/admin/signout", signout);

module.exports = router;
