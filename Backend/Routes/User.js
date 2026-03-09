const express=require("express")
const router=express.Router()
const {renderLogin,renderSignup,handleLogin,handleSignup}=require("../Controller/User")

router.get('/login',renderLogin);
router.post('/login',handleLogin);

router.get('/signup',renderSignup)
router.post('/signup',handleSignup)

module.exports = router;
