import { read } from "node:fs"
import {readFile,writeFile} from "../file_handler/data_handler.js"
// import { DB } from "../main.js"


const customerPath = "./data/customer.json"

const productPath = "./data/products.json"

const customers = await readFile(customerPath)

const products = await readFile(productPath)






function isValidBody(body){
    if(body.customerId && body.productId && body.quantity)
        return{
           customerId: body.customerId,
           productId: body.productId,
           quantity:body.quantity
    }

}

// console.log(isValidBody({customerId:"c59",productId:"102",quantity:55,test:"none"}))



function iscustomerExitst(body){
    const exists = customers.some((user)=>{return user.customerId === body.customerId});
    if(!exists){
        console.log(`user:${body.customerId} not found`)
        return false 
    }
    return true
}



function isItemExists(body){
    const exists = products.some((prod)=>{return prod.id === Number(body.productId)});
    if(!exists){
        console.log(`product: ${body.productId} not found`);
        return false
    }
    return true
}



function inStock(body){
    const exists = products.find((prod)=>{return prod.id === Number(body.productId)})
    if(exists.stock >= body.quantity){
        return true
    }
    console.log("insuficient balance")
    return false

}




async function addedToCart(body,res){
    try{
        
        const validBody = isValidBody(body);
        if(!validBody){
          return (400,"invalid body")
        }

        if(!iscustomerExitst(validBody)){
            return (404,`user:${validBody.customerId} not found`)
        }

        if(!isItemExists(validBody)){
            return (404,`product: ${validBody.productId} not found`)
        }
        
        if(!inStock(validBody)){
            return (400,"Out of stock")
        }
        const added = {
            productId:validBody.productId,
            quantity:validBody.quantity
        }
        const updatedcustom = customers.find((user)=>{return user.customerId === validBody.customerId})
        updatedcustom["cart"].push(added)
        await writeFile(customerPath,customers)

        const updatedproduct = products.find((prod)=>{return prod.productId === Number(validBody.productId)})
        updatedproduct["stock"]-=validBody.productId
        await writeFile(productPath,products)

        return(200,"success added to cart")


    }catch(err){
        console.log(err)
    }
}


const validBody = isValidBody({customerId:"c59",productId:"102",quantity:2,test:"none"});

const updatedproduct = pr.find((user)=>{return user.Id === Number(validBody.productId)})
console.log(validBody.productId)
// updatedproduct["stock"]-=1
console.log(updatedproduct)


// await console.log(addedToCart({customerId:"c59",productId:"102",quantity:2,test:"none"}))

