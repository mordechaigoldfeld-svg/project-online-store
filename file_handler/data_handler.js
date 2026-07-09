import fs from "fs/promises"





export async function writeFile(filePath,body) {
    try{
        await fs.writeFile(filePath,JSON.stringify(body),"utf-8");
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




