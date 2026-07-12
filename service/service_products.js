import { readFile } from "../file_handler/data_handler.js"


const productPath = "./data/products.json"

const products = await readFile(productPath)




export function getItems(filters){
    const {inStock,maxPrice,search} = filters
    let filteredList = [...products]
    if(inStock !== undefined){
        if (inStock !== "true" && inStock !== "false") {
                return [400, "Invalid query"];
            }
        if (inStock === "true") {
                filteredList = filteredList.filter(prod => prod.stock > 0);
        } else {
                filteredList = filteredList.filter(prod => prod.stock === 0);
        }
        
    }   if(maxPrice !==undefined){
        if(isNaN(maxPrice)){
            return [400,"invalid query"]
        }
        filteredList = filteredList.filter((item)=>(item.price <= Number(maxPrice)))
    }

    if(search !== undefined){
        const searchKeyword = search.toLowerCase().trim();
        filteredList = filteredList.filter((item)=>{return item.name.toLowerCase().trim().includes(searchKeyword)})
    }
    
    return [200,filteredList]

}








