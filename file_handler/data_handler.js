import fs from "fs/promises"


const COSTUMERPATH = "./data/customer.json"
const PRODUCTSPATH = "./data/products.json"


export async function writeFile(filePath,body) {
    try{
        await fs.writeFile(filePath,JSON.stringify(body,null,2),"utf-8");
        console.log("success write to file")
    }catch(err){
        console.log(err)
    }
}


export async function readFile(filePath) {
    try{
        const data = await fs.readFile(filePath,"utf-8");
        console.log("success readed")
        return JSON.parse(data || []);

    }catch(err){
        console.log(err)
    }
    
}




