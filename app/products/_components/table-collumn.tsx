"use client"

import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../_components/ui/badge"
import { log } from "console"
import { CircleIcon } from "lucide-react"





const getStatusProduct = ( stock: number) =>{
  if(stock > 0){
    return "Em estoque"
  }
  return "Fora de estoque"
}


export const ProductTableCollumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: row => {
      const product = row.row.original
      const label = getStatusProduct(product.stock)
      
      return <Badge 
       className="gap-2"
       variant={label === "Em estoque" ? "default" : "outline"}>
       <CircleIcon
            size={12}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
       </Badge>
    }
  },
]
