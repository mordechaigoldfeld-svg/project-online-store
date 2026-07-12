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
    console.log("out of stock")
    return false

}




export async function addedToCart(body,res){
    try{
        
        const validBody = isValidBody(body);
        if(!validBody){
          return [400,"invalid body"]
        }

        if(!iscustomerExitst(validBody)){
            return [404,`user:${validBody.customerId} not found`]
        }

        if(!isItemExists(validBody)){
            return [404,`product: ${validBody.productId} not found`]
        }
        
        if(!inStock(validBody)){
            return [400,"Out of stock"]
        }
        const added = {
            productId:validBody.productId,
            quantity:validBody.quantity
        }
        const updatedcustom = customers.find((user)=>{return user.customerId === validBody.customerId})
        updatedcustom["cart"].push(added)
        await writeFile(customerPath,customers)

        // const updatedproduct = products.find((prod)=>{return prod.id === Number(validBody.productId)})
        // updatedproduct["stock"]-=validBody.quantity
        // await writeFile(productPath,products)
        // console.log("end")
        return [200,"success added to cart"]


    }catch(err){
        console.log(err)
    }
}




// await console.log(await addedToCart({customerId:"c5c9",productId:"101",quantity:1,test:"none"}))


export async function getCartById(customerId) {
    try{
        if(!customerId.customerId){
            return [400,"invalid query"]
        }
        if(!iscustomerExitst(customerId)){
            return [404,`id:${customerId.customerId} not found`]
        }
        const userCart = customers.find((user)=>{return user.customerId === customerId.customerId})
        if(userCart.cart.length === 0){
            return[200,{message:"empty cart"}]
        }
        return [200,userCart.cart]
     

    }catch(err){
        console.log(err)
    }
    
}







// customerId:body,productId:params
export async function deleteItemCart(customerId,productId){
        try{
            const cart = await getCartById(customerId)
            if(cart[0] !== 200){
                return [cart[0],cart[1]]
            }
            const inCart = cart[1].find((item)=>{return item.productId === productId.productId})
            if(!inCart || !productId.productId){
                return [404,`product: ${productId.productId} not found`]
            }
            const currentCustom = customers.find((user)=>{return user.customerId === customerId.customerId})
            currentCustom.cart = currentCustom.cart.filter((item)=>{return item.productId !== productId.productId})
            await writeFile(customerPath,customers)

            return[200,"succes delete item"]

        }catch(err){
            console.log(err)
        }
}





