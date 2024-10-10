"use client"

import { AlertDialog, AlertDialogTrigger }from "@/app/_components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"
import { ClipboardCopy, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import DeleteProductDialogContent from "./delete-dialog-content"
import { Product } from "@prisma/client"
import { Dialog } from "@/app/_components/ui/dialog"
import { DialogTrigger } from "@/app/_components/ui/dialog"
import { useState } from "react"
import UpsertProductDialogComponent from "./upsert-dialog-content"

interface ProductTableDropdownMenuProps{
 product: Product
}

const ProductTableDropdownMenu = ({product}: ProductTableDropdownMenuProps) =>{
  const[isOpenDialog, setIsOpenDialog] = useState(false)

  return(
    <AlertDialog>
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" >
        <MoreHorizontalIcon size={14}/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Ações</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-2"
       onClick={() => navigator.clipboard.writeText(product.id)}
      >
        <ClipboardCopy size={14}/>
        Copiar ID
        </DropdownMenuItem>

      <DialogTrigger asChild>
      <DropdownMenuItem className="gap-2">
        <EditIcon size={14}/>
        Editar
      </DropdownMenuItem>
      </DialogTrigger>
      <AlertDialogTrigger asChild>
      <DropdownMenuItem className="gap-2">
        <TrashIcon size={14}/>
        Deletar
      </DropdownMenuItem>
      </AlertDialogTrigger>
    </DropdownMenuContent>
    <UpsertProductDialogComponent 
     defaultValues={{
      id: product.id,
      name: product.name,
      price: Number(product.price),
      stock: product.stock,
    }}
    onSuccess={() => setIsOpenDialog(false)}
    />
    <DeleteProductDialogContent productId={product.id}/>
  </DropdownMenu>
  </Dialog>
  </AlertDialog>
  )
}

export default ProductTableDropdownMenu