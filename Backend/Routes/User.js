const express=require("express")
const router=express.Router()
const {handleLogin,handleSignup,handleLogout,fetchUser}=require("../Controller/User")

router.post('/login',handleLogin);

router.post('/signup',handleSignup)

router.post('/logout',handleLogout)

router.get("/me",fetchUser)

module.exports = router;
