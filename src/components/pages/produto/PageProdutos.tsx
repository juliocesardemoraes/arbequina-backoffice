import DialogCreateProduct from "@/components/dialogsProduct/DialogCreateProduct";
import DialogEditNome from "@/components/dialogsUser/DialogEditNome";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";

interface PageProdutosProps {
  produtos: any;
  categorias: any;
}

export default function PageProdutos({ produtos, categorias }: PageProdutosProps) {
  const [filter, setFilter] = useState('Todos');

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const filteredProduct = produtos?.filter((produto: any) => {
    if (filter === 'Todos') return true;
    if (filter === 'Disponível') return produto.PRODUCT_DELETED === false;
    if (filter === 'Indisponível') return produto.PRODUCT_DELETED === true;
  });


  const rows = filteredProduct?.map((produto: any, _id: string) => (
    <TableRow key={_id}>
      <TableCell className="font-medium">
        <div className="font-medium">{produto.PRODUCT_NAME}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">{produto.PRODUCT_CATEGORY}</div>
      </TableCell>
      <TableCell className="text-end hidden md:table-cell">{produto.PRODUCT_DELETED ? 'Indisponivel' : 'Disponivel'}</TableCell>
      <TableCell className="text-end hidden md:table-cell">{produto.PRODUCT_PRICE}</TableCell>
      <TableCell className="text-end hidden md:table-cell">{produto.PRODUCT_QUANTITY}</TableCell>
      <TableCell className="text-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <main className="flex flex-col gap-4 p-4 lg:gap-2 lg:p-6 lg:pb-0">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Produtos</h1>
        </div>
        <div
          className="flex flex-1 justify-center rounded-lg border-0 shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <Tabs className="w-full" defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtro
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Todos'}
                      onCheckedChange={() => handleFilterChange('Todos')}
                    >
                      Todos
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Disponível'}
                      onCheckedChange={() => handleFilterChange('Disponível')}
                    >
                      Disponível
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Indisponível'}
                      onCheckedChange={() => handleFilterChange('Indisponível')}
                    >
                      Indisponível
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Novo produto
                      </span>
                    </DialogTrigger>
                    <DialogCreateProduct categorias={categorias} />
                  </Dialog>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <ScrollArea className="h-[65vh] w-full" >
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead>Nome</TableHead>
                          <TableHead className="text-end hidden md:table-cell">Status</TableHead>
                          <TableHead className="text-end hidden md:table-cell">Preço</TableHead>
                          <TableHead className="text-end hidden md:table-cell">Estoque</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
              <div className="mt-2 ml-2">
                <span className="text-[10px]">OBS: produtos indisponíveis são produtos que foram apagados e que não serão mais vendidos, produtos com o estoque 0 são produtos que ainda fazem parte do catalogo de vendas.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}