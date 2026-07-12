import express from "express"
import {getItems} from "../service/service_products.js"

const router = express()

export default router



router.get("/",(req,res)=>{
    const filters = req.query
    const response = getItems(filters)
    res.status(response[0]).json(response[1])
})