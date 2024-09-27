"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { log } from "console"
import { PlusIcon } from "lucide-react"
import { useForm} from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do produto é obrigatorio.",
  }),
  price: z.number().min(0.01,{
    message: "O preço do produto é obrigatório"
  }),
  stock: z.number().int().min(0,{
    message: "A quantidade em estoque é obrigatoria"
  })
})

 type FormSchema= z.infer<typeof formSchema>

const AddFormButton = () =>{
  const form = useForm <FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price:0,
      stock:1,
    },
  })
 const onSubmit = (data: FormSchema) =>{
  console.log({data});
  
 }
  return(
    <Dialog>
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
                  <Input placeholder="insira o preço do produto..." {...field} />
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
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


export default AddFormButton