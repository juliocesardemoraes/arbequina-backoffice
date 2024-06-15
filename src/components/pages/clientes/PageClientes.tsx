import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { useState } from "react";

interface PageClientesProps {
  users: any
}

export default function PageClientes({ users }: PageClientesProps) {
  const [filter, setFilter] = useState('Todos');

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const filteredUser = users?.filter((user: any) => {
    if (filter === 'Todos') return true;
    if (filter === 'Ativo') return user.USER_DELETED === false;
    if (filter === 'Desativado') return user.USER_DELETED === true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const rows = filteredUser?.map((user: any, index: any) => (
    <TableRow className="w-full flex justify-between" key={index}>
      <TableCell className="flex-1 flex-row items-center">
        <div className="font-medium">{user.USER_NAME}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">{user.USER_EMAIL}</div>
      </TableCell>
      <TableCell className="flex-1 flex items-center justify-end hidden sm:flex mr-6">{formatDate(user.createdAt)}</TableCell>
      <TableCell className="flex-1 flex items-center justify-end">{user.USER_DELETED ? 'Desativado' : 'Ativo'}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <main className="flex flex-col gap-4 p-4 lg:gap-2 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
        </div>
        <div
          className="flex flex-1 justify-center rounded-lg border-0 shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <Tabs className="w-full" defaultValue="clientes">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filtro</span>
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
                      checked={filter === 'Ativo'}
                      onCheckedChange={() => handleFilterChange('Ativo')}
                    >
                      Ativo
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Desativado'}
                      onCheckedChange={() => handleFilterChange('Desativado')}
                    >
                      Desativado
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="clientes">
              <Card x-chunk="dashboard-05-chunk-3" className="flex flex-1 overflow-hidden border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <Table className="flex flex-1 flex-col">
                    <TableHeader className="flex w-full ">
                      <TableRow className="w-full flex justify-between bg-muted hover:bg-muted">
                        <TableHead className="pr-10 flex-1 flex items-center">Nome</TableHead>
                        <TableHead className="flex-1 flex items-center justify-end hidden sm:flex">Data de criação</TableHead>
                        <TableHead className="flex-1 flex items-center justify-end">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <ScrollArea className="h-[65vh]" >
                        {rows}
                      </ScrollArea>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main >
    </>
  )
}