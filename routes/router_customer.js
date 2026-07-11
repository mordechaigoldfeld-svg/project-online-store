import express from "express"
import { addedToCart,getCartById,deleteItemCart } from "../service/service_customer.js"

const router = express.Router()

export default router





router.post("/items",async (req,res)=>{
    const body = req.body
    const response = await addedToCart(body)
    res.status(response[0]).end(response[1])
    
})

router.get("/",async(req,res)=>{
    const customerId = req.body
    const user = await getCartById(customerId)
    res.status(user[0]).json(user[1])
})


router.delete("/items",async(req,res)=>{
      const customerId = req.body
      const productId = req.query
      const response = await deleteItemCart(customerId,productId)
      res.status(response[0]).json(response[1])

})


