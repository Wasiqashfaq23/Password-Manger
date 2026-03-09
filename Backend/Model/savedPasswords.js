const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    service:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

const Password=mongoose.model("password",schema)
module.exports={Password}