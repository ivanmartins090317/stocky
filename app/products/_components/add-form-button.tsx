"use client"

import { createProduct } from "@/app/_actions/product/create-product"
import { CreateProductSchema, createProductSchema } from "@/app/_actions/product/create-product/schema"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm} from "react-hook-form"
import { NumericFormat } from "react-number-format";

const AddFormButton = () =>{
 const [dialogIsOpen, setDialogIsOpen] = useState(true)

  const form = useForm <CreateProductSchema>({
    shouldUnregister:true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price:0,
      stock:1,
    },
  })
 const onSubmit = async (data: CreateProductSchema) =>{
  try {
    await createProduct(data)
    setDialogIsOpen(false);
  } catch (error) {
    console.log({message: error});
    
  }
  
 }
  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
      <Button className="gap-2">
        <PlusIcon size={12}/>
        Novo produto
      </Button>
      </DialogTrigger>
      <DialogContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>      
          <DialogHeader>
            <DialogTitle>
              Insira Informações do Produto
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
    </Dialog>
  )
}


export default AddFormButton

