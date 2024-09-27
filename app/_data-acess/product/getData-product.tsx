import 'server-only'

import { db } from "@/app/_lib/prisma"
import { Product } from "@prisma/client"


const getDataProduct = async (): Promise<Product[]> =>{
 return db.product.findMany({})
}

export {getDataProduct}