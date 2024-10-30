import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"
import { ClipboardCopy, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { Product } from "@prisma/client"



interface SaleTableDropDownProps{
  product: Pick<Product, "id">
  onDelete: (productId: string) => void
}

const SalesTableDropDown = ({product, onDelete} : SaleTableDropDownProps ) =>{
 return(
 
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
   
    <DropdownMenuItem className="gap-2" onClick={() => onDelete(product.id)}>
      <TrashIcon size={14}/>
      Deletar
    </DropdownMenuItem>
  </DropdownMenuContent>

</DropdownMenu>

 )
}

export default SalesTableDropDown