const { getUser } = require("../Services/Auth")

function checkForAuthentication(req,res,next) {
    const tokenCookie=req.cookies?.token    
    req.user=null
    if(!tokenCookie)
    {
        return next()
    }
    const token = tokenCookie
    const user= getUser(token)
    req.user=user
    next()
}
module.exports={checkForAuthentication}