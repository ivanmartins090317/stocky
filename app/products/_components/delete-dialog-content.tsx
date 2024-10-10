import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog"
import { DeleteProduct } from "../../_actions/product/delete-product"
import { toast } from "sonner"

interface DeleteProductProps{
  productId : string
}
const DeleteProductDialogContent = ({productId}: DeleteProductProps) =>{
 const handleDeleteContinuosProduct = async () =>{
  try {
    await DeleteProduct({id : productId})
    toast.success("Produto excluido com sucesso")
  } catch (error) {
    toast.error("Ocorreu algum erro ao excluir o produto")
  }
 }

  return (
    <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Você tem certeza que deseja deletar o item? </AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação pode não ter volta. 
        O item será removido permanetemente do banco de dados.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteContinuosProduct}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  )
}
export default DeleteProductDialogContent

function deleteProduct(arg0: { id: DeleteProductProps }) {
  throw new Error("Function not implemented.")
}
