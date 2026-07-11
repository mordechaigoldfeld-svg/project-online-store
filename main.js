import express from "express"
import cartRouter from "./routes/router_customer.js"


const PORT = process.env.PORT || 5000

// export const DB = process.env.DB_BASE_PATH 



const app = express()

app.use(express.json())


app.get("/",(req,res)=>{
    res.end('welcome to online store server')
})


app.get("/health",(req,res)=>{
    res.end("success health verification")
})







app.use("/cart",cartRouter)
// app.use("/",cartRouter)


app.listen(PORT,()=>{
    console.log("server runing...")
})