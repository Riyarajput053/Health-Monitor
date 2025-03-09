const express = require("express")
const {register,login, logout, GetAuthUser, patientInfo} = require("../controller/usercontroller")
const Authorizaton = require("../controller/Authorization")
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout", Authorizaton,logout)
router.post("/patientInfo",patientInfo)




module.exports = router