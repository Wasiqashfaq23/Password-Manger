const express=require("express")
const router=express.Router()
const {handleLogin,handleSignup,handleLogout}=require("../Controller/User")

router.post('/login',handleLogin);

router.post('/signup',handleSignup)

router.post('/logout',handleLogout)

module.exports = router;
