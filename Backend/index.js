require("dotenv").config()
const express = require("express")
const app = express()
const { connectToMongo } = require("./connect")
const port = 8001
const cookieParser = require("cookie-parser")

const passRouter = require("./Routes/savedPasswords")
const userRouter = require("./Routes/User")

const { checkForAuthentication } = require("./Middleware/Auth")
const cors = require("cors");


connectToMongo(process.env.MONGO_URI).then(() => { console.log("Mongo connected") })

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173"
]
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
app.use(express.static("Public"));
app.use("/", userRouter)
app.use("/password", checkForAuthentication, passRouter)

app.listen(port, () => {
  console.log("Listening at port", port)
})