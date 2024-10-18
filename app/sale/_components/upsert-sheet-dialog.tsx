'use client'

import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
  productId : z.string().uuid(),
  quantity : z.number().int().positive(),
})

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps{
  productOptions: ComboboxOption[]
}

const UpsertSheetDialogContent = ({productOptions}: UpsertSheetContentProps) =>{
  const form = useForm<FormSchema>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      productId : "",
      quantity: 1,
    },
  });
  return(
    <SheetContent>
    <SheetHeader>
      <SheetTitle>Venda de produto</SheetTitle>
      <SheetDescription>
        Criar a venda do produto
      </SheetDescription>
    </SheetHeader>
    <Form {...form}>
      <form >
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
      </form>
    </Form>
  </SheetContent>
  )
}

export default UpsertSheetDialogContent