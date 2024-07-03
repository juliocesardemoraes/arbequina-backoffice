'use client';
import DialogDeleteProduct from "@/components/dialogsProduct/DialogDeleteProduct";
import DialogCreateProduct from "@/components/dialogsProduct/DialogCreateProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { useState } from "react";
import formatPrice from "@/utils/formatPrice";

interface PageProdutosProps {
  produtos: any;
  categorias: any;
}

export default function PageProdutos({ produtos, categorias }: PageProdutosProps) {
  const [filter, setFilter] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [hideDisabled, setHideDisabled] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleOpenDeleteDialog = (productId: string) => {
    setDeleteProductId(productId);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteProductId(null);
  };

  const filteredProduct = produtos?.filter((produto: any) => {
    if (filter !== 'Todos') {
      if (filter === 'Disponível' && produto.PRODUCT_DELETED) return false;
      if (filter === 'Indisponível' && !produto.PRODUCT_DELETED) return false;
    }
    if (selectedCategory !== 'Todas' && produto.PRODUCT_CATEGORY !== selectedCategory) return false;
    if (hideDisabled && produto.PRODUCT_DELETED) return false;
    return true;
  });

  const rows = filteredProduct?.map((produto: any) => (
    <TableRow key={produto._id}>
      <TableCell className="font-medium flex flex-col">
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full ${produto.PRODUCT_DELETED ? 'bg-red-500' : 'bg-green-500'} mr-2 md:hidden`} />
          <span className="text-sm">{produto.PRODUCT_NAME}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{produto.PRODUCT_CATEGORY}</div>
          <span className="text-sm text-muted-foreground md:hidden">{produto.PRODUCT_QUANTITY} Un.</span>
        </div>
      </TableCell>
      <TableCell className="text-end hidden md:table-cell">{formatPrice(produto.PRODUCT_PRICE)}</TableCell>
      <TableCell className="text-end hidden md:table-cell">{produto.PRODUCT_QUANTITY} Un.</TableCell>
      <TableCell className="text-end hidden md:table-cell">
        <div className="flex items-center justify-end">
          <span className="text-sm mr-3">{produto.PRODUCT_DELETED ? 'Indisponível' : 'Disponível'}</span>
          <div className={`w-2.5 h-2.5 rounded-full ml-1 ${produto.PRODUCT_DELETED ? 'bg-red-500' : 'bg-green-500'}`} />
        </div>
      </TableCell>
      <TableCell className="text-end pl-0">
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
            <DropdownMenuItem>
              <a href={`/produto/${produto._id}`}>Editar</a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDeleteDialog(produto._id)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <main className="flex flex-col gap-4 p-4 lg:gap-2 lg:p-6 lg:pb-0">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Produtos</h1>
        </div>
        <div className="flex flex-1 justify-center rounded-lg border-0 shadow-sm" x-chunk="dashboard-02-chunk-1">
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
                  <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
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
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filtrar por categoria</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={selectedCategory === 'Todas'}
                      onCheckedChange={() => handleCategoryChange('Todas')}
                    >
                      Todas
                    </DropdownMenuCheckboxItem>
                    {categorias.map((categoria: any) => (
                      <DropdownMenuCheckboxItem
                        key={categoria._id}
                        checked={selectedCategory === categoria.CATEGORY_NAME}
                        onCheckedChange={() => handleCategoryChange(categoria.CATEGORY_NAME)}
                      >
                        {categoria.CATEGORY_NAME}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Novo produto
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogCreateProduct categorias={categorias} />
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <ScrollArea className="h-[63vh] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead className='md:w-[30%]'>Nome</TableHead>
                          <TableHead className="md:w-[10%] text-end hidden md:table-cell">Preço</TableHead>
                          <TableHead className="md:w-[10%] text-end hidden md:table-cell">Estoque</TableHead>
                          <TableHead className="md:w-[10%] text-end hidden md:table-cell">Status</TableHead>
                          <TableHead className='md:w-[10%]'>
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
                <span className="text-[10px]">OBS: Produtos indisponíveis não são apagados do banco porem não fazem mais parte do catálogo, produtos com o estoque 0 são produtos que ainda fazem parte do catálogo de vendas.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {deleteProductId && (
        <Dialog open={true} onOpenChange={handleCloseDeleteDialog}>
          <DialogDeleteProduct productId={deleteProductId} />
        </Dialog>
      )}
    </>
  );
}