import { z } from "zod"

export const upsertProductShema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, {
    message: "O nome do produto é obrigatorio.",
  }),
  price: z.number().min(0.01,{
    message: "O preço do produto é obrigatório"
  }),
  stock: z.coerce.number().positive({
    message: "A quantidade deve ser positiva"
  })
  .int().min(0,{
    message: "A quantidade em estoque é obrigatoria"
  })
})

export type UpsertProductSchema= z.infer<typeof upsertProductShema>