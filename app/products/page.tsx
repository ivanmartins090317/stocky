import { PlusIcon } from "lucide-react"
import { Button } from "../_components/ui/button"
import { DataTable} from "../_components/ui/data-table"
import { db } from "../_lib/prisma"
import { ProductTableCollumns } from "../products/_components/table-collumn"


const ProductPage = async () =>{
  const products = await db.product.findMany({})
  return (
    <div className="w-full bg-white m-8 p-8 rounded-md">
    {/* HEADER E TABELA */}
     <div className="flex justify-between py-4" >
      <div>
          <span className="text-gray-500 text-sm">Produtos</span>
          <h2 className="font-bold font-md">Gestão de produtos</h2>
      </div>
      <Button className="gap-2">
        <PlusIcon size={12}/>
        Novo produto
      </Button>
     </div>
      <DataTable columns={ProductTableCollumns} data={products}/>
    </div>
  )
}

export default ProductPage