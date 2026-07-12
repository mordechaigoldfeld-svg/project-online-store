import express from "express"
import { getBalance } from "../service/service_customer.js"

const router = express()

export default router



router.get("/",(req,res)=>{
    const customerId = req.query
    const response = getBalance(customerId)
    res.status(response[0]).json(response[1])
})