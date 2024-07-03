import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import formatDate from "@/utils/formatDate";
import { ListFilter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface User {
  _id: string;
  USER_NAME: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  USER_DELETED: boolean;
  createdAt: string;
}

interface PageClientesProps {
  users: User[];
}

export default function PageClientes({ users }: PageClientesProps) {
  const [filter, setFilter] = useState<string>('Todos');

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const filteredUser = users?.filter((user: User) => {
    if (filter === 'Todos') return true;
    if (filter === 'Ativo') return !user.USER_DELETED;
    if (filter === 'Desativado') return user.USER_DELETED;
  });

  const rows = filteredUser?.map((user: User) => (
    <TableRow key={user._id}>
      <TableCell className="font-medium flex flex-col">
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full ${user.USER_DELETED ? 'bg-red-500' : 'bg-green-500'} mr-2 md:hidden`} />
          <span className="text-sm">{user.USER_NAME}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">{user.USER_EMAIL}</div>
      </TableCell>
      <TableCell className="text-end hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
      <TableCell className="text-end hidden md:table-cell">
        <div className="flex items-center justify-end">
          <span className="text-sm mr-3">{user.USER_DELETED ? 'Desativado' : 'Ativo'}</span>
          <div className={`w-2.5 h-2.5 rounded-full ml-1 ${user.USER_DELETED ? 'bg-red-500' : 'bg-green-500'}`} />
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
              <a href={`/cliente/${user._id}`}>Detalhes</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <main className="flex flex-col gap-4 p-4 lg:gap-2 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Clientes</h1>
        </div>
        <div
          className="flex flex-1 justify-center rounded-lg border-0 shadow-sm"
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
              <Card className="flex flex-1 overflow-hidden border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <ScrollArea className="h-[65vh]">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead className='md:w-[40%]'>Cliente</TableHead>
                          <TableHead className="md:w-[20%] text-end hidden md:table-cell">Data de criação</TableHead>
                          <TableHead className="md:w-[20%] text-end hidden md:table-cell">Status</TableHead>
                          <TableHead className='md:w-[20%]'>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}