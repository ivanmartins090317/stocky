import { Button } from "../_components/ui/button"
import { ComboboxOption } from "../_components/ui/combobox"
import { Sheet, SheetTrigger } from "../_components/ui/sheet"
import { getDataProduct } from "../_data-acess/product/getData-product"
import UpsertSheetDialogContent from "./_components/upsert-sheet-dialog"

interface Params{
  id: string
}

const Sale = async () =>{
  const products = await getDataProduct()
  const productOptions: ComboboxOption[] = products.map(product =>({
    value: product.id,
    label: product.name
  }))
  return (
    <div className="w-full bg-white m-8 p-8 rounded-md">
    {/* HEADER E TABELA */}
     <div className="flex justify-between py-4" >
      <div>
          <span className="text-gray-500 text-sm">Produtos</span>
          <h2 className="font-bold font-md">Gestão de produtos</h2>
      </div>
      <Sheet>
        <SheetTrigger asChild>
         <Button>Nova venda</Button>    
        </SheetTrigger>
        <UpsertSheetDialogContent products={products} productOptions={productOptions}/>
      </Sheet>
      </div>
      {/* <DataTable columns={ProductTableCollumns} data={products}/> */}
    </div>
  )
}


export default Sale