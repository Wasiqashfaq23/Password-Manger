const { setUser } = require("../Services/Auth")
const {User}=require("../Model/User")

async function handleLogin(req,res){
    const { email, password } = req.body
    const user = await User.findOne({
        email, password
    })
    if (!user) { return res.json("Invalid Username or Password") }
    const token = setUser(user)
    res.cookie("token",token)
    return res.json("Login Successfull")
}

async function handleSignup(req,res){
        const { userName, email, password } = req.body;
    await User.create({
        userName,
        email,
        password,
    })
    return res.json("Successfull signup")
}


async function renderLogin(req,res){
    return res.json("no")
}

async function renderSignup(req,res){
    return res.json("no")
}

module.exports={renderLogin,renderSignup,handleLogin,handleSignup}