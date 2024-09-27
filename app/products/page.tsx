import { PlusIcon } from "lucide-react"
import { Button } from "../_components/ui/button"
import { DataTable} from "../_components/ui/data-table"
import { ProductTableCollumns } from "../products/_components/table-collumn"
import { getDataProduct } from "../_data-acess/product/getData-product"
import AddFormButton from "./_components/add-form-button"


const ProductPage = async () =>{
  // CAMADA DO BANCO DE DADOS
  const products = await getDataProduct()
  return (
    <div className="w-full bg-white m-8 p-8 rounded-md">
    {/* HEADER E TABELA */}
     <div className="flex justify-between py-4" >
      <div>
          <span className="text-gray-500 text-sm">Produtos</span>
          <h2 className="font-bold font-md">Gestão de produtos</h2>
      </div>
       <AddFormButton/>
     </div>
      <DataTable columns={ProductTableCollumns} data={products}/>
    </div>
  )
}

export default ProductPage