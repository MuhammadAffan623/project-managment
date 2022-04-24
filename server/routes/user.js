const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controller/user-controller");
const { auth } = require("../middleware/auth")


router.post("/register", signUp); 

router.post("/", login);

router.get("/auth", auth);
 

module.exports = router;