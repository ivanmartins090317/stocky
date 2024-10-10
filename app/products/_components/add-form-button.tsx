"use client"

import { Button } from "@/app/_components/ui/button"
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog"
import UpsertProductDialogComponent from "./upsert-dialog-content"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

const AddFormButton = () =>{
 const [dialogIsOpen, setDialogIsOpen] = useState(false)


  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
      <Button className="gap-2">
        <PlusIcon size={12}/>
        Novo produto
      </Button>
      </DialogTrigger>
      <UpsertProductDialogComponent onSuccess={() => setDialogIsOpen(false)}/>
    </Dialog>
  )
}


export default AddFormButton

