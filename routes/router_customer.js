import express from "express"

const router = express.Router()

export default router


router.post("/",(req,res)=>{
    const body = req.body
    
    res.json(body)
})
