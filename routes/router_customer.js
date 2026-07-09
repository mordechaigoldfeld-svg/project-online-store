import express from "express"
import { addedToCart } from "../service/service_customer.js"

const router = express.Router()

export default router


router.post("/",async (req,res)=>{
    const body = req.body
    const response = await addedToCart(body)
    res.status(response[0]).end(response[1])
    
})
