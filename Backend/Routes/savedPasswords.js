const express=require("express")
const router=express.Router()
const {renderPasswords,createFields,deleteField,updateField}=require("../Controller/savedPasswords")

router.get("/",renderPasswords)
router.post("/",createFields)
router.delete("/:id",deleteField)
router.patch("/:id",updateField)
module.exports=router;