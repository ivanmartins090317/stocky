'use client'

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import {Table,TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/app/_components/ui/table";
import formatCurrency from "@/app/helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { MoreHorizontalIcon, PlusIcon} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import SalesTableDropDown from "./table-dropdown-menu";

const formSchema = z.object({
  productId : z.string().uuid({
    message:"por favor, insira um produto"
  }),
  quantity : z.coerce.number().int().positive(),
})

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps{
  productOptions: ComboboxOption[]
  products : Product[]
}
interface SelectedProduct {
  id:string,
  name:string,
  price:number,
  quantity:number
}
const UpsertSheetDialogContent = ({products, productOptions}: UpsertSheetContentProps) =>{
 const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  const form = useForm<FormSchema>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      productId : "",
      quantity: 1,
    },
  });

  const valueProductsTotal = useMemo(() =>{
    return selectedProducts.reduce((acc, product) =>{
      const total = product.price * product.quantity
      return acc + total
    },0)
  },[selectedProducts])

  const onSubmit = (data:FormSchema) =>{
   const isSelectedProduct = products.find(product => product.id === data.productId)
   if(!isSelectedProduct)return;
   setSelectedProducts((currentProduct) =>{
    const duplicatedProduct = currentProduct.find(product => product.id === isSelectedProduct.id)
    if(duplicatedProduct){
       return currentProduct.map(product => {
        if(product.id === isSelectedProduct.id){
         return {
          ...product,
          quantity: product.quantity + data.quantity
         }
        }
        return product
       })
      }
      return [
       ...currentProduct,
       {
         ...isSelectedProduct,
         price:Number(isSelectedProduct.price),
         quantity: data.quantity
       }
      ]
   })
   form.reset() 
  }

  const onDelete = (productId: string) => {
   setSelectedProducts((currentProducts) =>{
    return currentProducts.filter(product => product.id !== productId)
   })
  }
  return(
    <SheetContent className="!max-w-[600px]">
    <SheetHeader>
      <SheetTitle>Venda de produto</SheetTitle>
      <SheetDescription>
        Criar a venda do produto
      </SheetDescription>
    </SheetHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
              control={form.control}
              name="productId"
              render={({field}) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                   placeholder="Escolha um produto"
                   options={productOptions}
                   {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

         <FormField
              control={form.control}
              name="quantity"
              render={({field}) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className="w-full gap-2 space-y-2" variant="secondary">
          <PlusIcon size={16}/>
          Adicionar produto a venda
        </Button>
      </form>
    </Form>
 
    <Table>
      <TableCaption>Lista de produtos vendidos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>total</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell >{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell >{formatCurrency(product.price * product.quantity)}</TableCell>
            <TableCell >
            <SalesTableDropDown product={product} onDelete={onDelete}/>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow >
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell >{formatCurrency(valueProductsTotal)}</TableCell>
          <TableCell/>
        </TableRow>
      </TableFooter>
    </Table>
  </SheetContent>
  )
}

export default UpsertSheetDialogContent