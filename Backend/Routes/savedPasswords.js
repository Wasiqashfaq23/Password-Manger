const express=require("express")
const router=express.Router()
const {renderPasswords,createFields}=require("../Controller/savedPasswords")

router.get("/",renderPasswords)
router.post("/",createFields)

module.exports=router;