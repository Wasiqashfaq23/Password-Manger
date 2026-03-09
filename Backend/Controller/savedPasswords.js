const { Password } = require("../Model/savedPasswords");

async function createFields(req,res) {
    const {service,email,password}=req.body;
    if(!email || !password || !service){return res.json("All fields are required")}
    await Password.create({
        email:email,
        service:service,
        password:password,
        createdBy:req.user._id
    })
    return res.json("Saved Password Success")
}

async function renderPasswords(req,res) {
        const allpasswords=await Password.find({createdBy: req.user._id})
        if(!allpasswords){res.json("No passwords found")}
        return res.json({passwords:allpasswords})
}

module.exports={renderPasswords,createFields}