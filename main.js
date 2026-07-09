import express from "express"
import cartRouter from "./routes/router_customer.js"


const PORT = process.env.PORT || 5000

export const DB = process.env.DB_BASE_PATH 



// const app = express()

// app.use(express.json())

// app.use("/cart",cartRouter)

// app.listen(PORT,()=>{
//     console.log("server runing...")
// })