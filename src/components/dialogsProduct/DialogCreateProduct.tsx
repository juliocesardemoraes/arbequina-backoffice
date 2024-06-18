import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaProductPost } from "@/schemas/schemaProductPost";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ProductCreateValues {
  PRODUCT_NAME?: string;
  PRODUCT_CATEGORY?: string;
  PRODUCT_QUANTITY?: number;
  PRODUCT_PRICE?: number;
}

export default function DialogCreateProduct({ categorias }: any) {
  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schemaProductPost)
  });

  const submitForm: SubmitHandler<ProductCreateValues> = (formData) => {
    console.log(formData);
  };

  return (
    <DialogContent className="w-[28rem] max-w-[90vw]">
      <DialogHeader>
        <DialogTitle className="text-center">Novo produto</DialogTitle>
        <DialogDescription className="text-center">
          Preencha os campos abaixo
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-2">
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="PRODUCT_NAME"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PRODUCT_CATEGORY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria do produto</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria: any) => (
                        <SelectItem key={categoria._id} value={categoria._id}>{categoria.CATEGORY_NAME}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PRODUCT_QUANTITY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade em estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PRODUCT_PRICE"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço do produto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}