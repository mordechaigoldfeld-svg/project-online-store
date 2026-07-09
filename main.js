import express from "express"
import cartRouter from "./routes/router_customer.js"


const PORT = process.env.PORT || 5000

export const DB = process.env.DB_BASE_PATH 



const app = express()

app.use(express.json())

app.use("/cart/items",cartRouter)

app.listen(3000,()=>{
    console.log("server runing...")
})