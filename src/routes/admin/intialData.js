const exress = require("express");
const router = exress.Router();
const {catAndProd}=require('../../controller/admin/initialData');

router.post("/initalData",catAndProd);

module.exports = router;
