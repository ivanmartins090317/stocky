"use client"

import { upsertProduct } from "@/app/_actions/product/create-product"
import { upsertProductShema, UpsertProductSchema } from "@/app/_actions/product/create-product/schema"
import { Button } from "@/app/_components/ui/button"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"

interface UpsertProductContentProps {
  defaultValues?: UpsertProductSchema
  onSuccess?: () => void
}
const UpsertProductDialogComponent = ({
  defaultValues,
  onSuccess,
}:UpsertProductContentProps) =>{
  const form = useForm <UpsertProductSchema>({
    shouldUnregister:true,
    resolver: zodResolver(upsertProductShema),
    defaultValues: defaultValues ?? {
      id: "",
      name: "",
      price:0,
      stock:1,
    },
  })
 const onSubmit = async (data: UpsertProductSchema) =>{
  try {
    await upsertProduct({...data, id: defaultValues?.id})
    onSuccess?.()
  } catch (error) {
    console.log({message: error});
    
  }
  
 }
 const isEditing = !!defaultValues
  return(
    <DialogContent>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>      
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar" : "Criar"} Produto
          </DialogTitle>
          {/* ITEM NAME*/}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="insira o nome do produto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          {/* ITEM PRICE*/}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do produto</FormLabel>
              <FormControl>
              <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale
                  decimalScale={2}
                  prefix="R$ "
                  allowNegative={false}
                  customInput={Input}
                  onValueChange={(values) =>
                  field.onChange(values.floatValue)
                  }
                  {...field}
                  onChange={() => {}}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
             {/* ITEM STOCK*/}
             <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade em estoque</FormLabel>
              <FormControl>
                <Input placeholder="insira a quantidade do produto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </DialogHeader>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button type="submit" 
          className="gap-1.5"
          disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" size={16} />
            ) }
            Adicionar
          </Button>
        </DialogFooter>
      </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertProductDialogComponent