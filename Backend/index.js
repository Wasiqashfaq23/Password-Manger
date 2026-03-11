const express=require("express")
const app=express()
const {connectToMongo} = require("./connect")
const port = 8001
const cookieParser=require("cookie-parser")

const passRouter=require("./Routes/savedPasswords")
const userRouter=require("./Routes/User")

const {checkForAuthentication}=require("./Middleware/Auth")
const cors = require("cors");


connectToMongo("mongodb://localhost:27017/pwdmgr").then(()=>{console.log("Mongo connected")})

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(checkForAuthentication)
app.use(express.static("Public"));
app.use("/",checkForAuthentication,userRouter)
app.use("/password",checkForAuthentication,passRouter)

app.listen(port,()=>{
    console.log("Listening at port",port)
})