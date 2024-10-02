"use server"

import { db } from "@/app/_lib/prisma"
import { CreateProductSchema, createProductSchema } from "./schema"
import { revalidatePath } from "next/cache"

export const createProduct = async (data: CreateProductSchema) =>{
  createProductSchema.parse(data)
  await db.product.create({
    data,
  }),
  revalidatePath('/products')
}