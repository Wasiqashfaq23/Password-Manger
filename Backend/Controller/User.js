const { setUser, getUser } = require("../Services/Auth")
const bcrypt = require("bcrypt")
const { User } = require("../Model/User")

async function handleLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({
        email
    })
    if (!user) { return res.json("Invalid Username or Password") }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) { return res.json("Invalid Username or Password") }
    const token = setUser(user)
    res.cookie("token", token)
    return res.json("Login Successful")
}

async function handleSignup(req, res) {
    const { userName, email, password } = req.body;
    const alreadyPresent =await User.findOne({ email })
    if (alreadyPresent) { return res.json("Email already registered") }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await User.create({
        userName,
        email,
        password: hashedPassword,
    })
    return res.json("Sign Successful")
}

async function handleLogout(req, res) {
    req.user = null
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
    });
    res.json("Logout Successful")
}

async function fetchUser(req, res) {
    const token = req.cookies.token;
    if (!token) return
    const userFromToken = getUser(token);
    const user = await User.findById(userFromToken._id);
    return res.json(user)
}

async function verifyCookie(req, res) {
    const token = req.cookies.token;
    if (!token) return
    const userFromToken = getUser(token);
    const user = await User.findById(userFromToken._id);
    if(user) {
        return res.json(user).status(200)
    }
        return res.status(401).json("No user found");
}

module.exports = { handleLogin, handleSignup, handleLogout, fetchUser,verifyCookie }