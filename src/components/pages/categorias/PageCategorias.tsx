import DialogCreateCategory from "@/components/dialogsCategory/DialogCreateCategory"
import DialogDeleteCategory from "@/components/dialogsCategory/DialogDeleteCategory"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react"
import { useState } from "react"

export default function PageCategorias({ categories }: any) {
  const [filter, setFilter] = useState('Todos');
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const handleOpenDeleteDialog = (categoryId: string) => {
    setDeleteCategoryId(categoryId);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteCategoryId(null);
  };

  const filteredCategory = categories?.filter((category: any) => {
    if (filter === 'Todos') return true;
    if (filter === 'Disponível') return !category.CATEGORY_DELETED;
    if (filter === 'Indisponível') return category.CATEGORY_DELETED;
  });

  const rows = filteredCategory?.map((category: any) => (
    <TableRow key={category._id}>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full ${category.CATEGORY_DELETED ? 'bg-red-500' : 'bg-green-500'} mr-2 md:hidden`} />
          <span className="text-sm">{category.CATEGORY_NAME}</span>
        </div>
      </TableCell>
      <TableCell className="text-end hidden md:table-cell">
        <div className="flex items-center justify-end">
          <span className="text-sm mr-3">{category.CATEGORY_DELETED ? 'Indisponível' : 'Disponível'}</span>
          <div className={`w-2.5 h-2.5 rounded-full ml-1 ${category.CATEGORY_DELETED ? 'bg-red-500' : 'bg-green-500'}`} />
        </div>
      </TableCell>
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
            <DropdownMenuItem>
              <a href={`/category/${category._id}`}>Editar</a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDeleteDialog(category._id)}>
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
          <h1 className="text-lg font-semibold md:text-2xl">Categorias</h1>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Nova categoria
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogCreateCategory />
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <ScrollArea className="h-[65vh] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead>Nome</TableHead>
                          <TableHead className="text-end hidden md:table-cell">Status</TableHead>
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
                <span className="text-[10px]">OBS: Categorias indisponíveis não são apagadas do banco porem não ficam mais disponiveis para adicionar produtos a ela, o status de indisponivel pode ser mudado a qualquer momento em editar.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {deleteCategoryId && (
        <Dialog open={true} onOpenChange={handleCloseDeleteDialog}>
          <DialogDeleteCategory categoryId={deleteCategoryId} />
        </Dialog>
      )}
    </>
  );
}