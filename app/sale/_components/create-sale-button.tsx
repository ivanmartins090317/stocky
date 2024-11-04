"use client"

import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import UpsertSheetDialogContent from "./upsert-sheet-dialog"
import { ComboboxOption } from "@/app/_components/ui/combobox"
import { Product } from "@prisma/client"
import { useState } from "react"



interface createSaleProps{
  productOptions: ComboboxOption[]
  products : Product[]
}
const CreateSaleButton = (props: createSaleProps) =>{
  const [sheetIsOpen, setSheetIsOpen] = useState(true)
  return(
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
    <SheetTrigger asChild>
     <Button>Nova venda</Button>    
    </SheetTrigger>
    <UpsertSheetDialogContent onSubmitSucess={() => setSheetIsOpen(false)} {...props}/>
  </Sheet>
  )
}

export default CreateSaleButton