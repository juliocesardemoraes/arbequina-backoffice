'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import formatDate from '@/utils/formatDate';
import formatPrice from '@/utils/formatPrice';
import { ListFilter, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Compra {
  _id: string;
  CART_USER_ID: string;
  CART_PRODUCT: {
    PRODUCT_ID: string;
    PRODUCT_QUANTITY: number;
    _id: string;
  }[];
  CART_PRICE: number;
  CART_STATUS: 'active' | 'completed' | 'canceled';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PageTransacoesProps {
  compras: Compra[] | null;
}

const statusMap: { [key: string]: { label: string, color: string } } = {
  active: { label: 'Pendente', color: 'bg-orange-500' },
  completed: { label: 'Concluída', color: 'bg-green-500' },
  canceled: { label: 'Cancelada', color: 'bg-red-500' }
};

function getStatusLabelAndClass(status: string) {
  return statusMap[status] || { label: 'Desconhecido', color: 'bg-gray-500' };
}

export default function PageTransacoes({ compras }: PageTransacoesProps) {
  const [filter, setFilter] = useState<string>('Todos');

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const filteredCompra = compras?.filter((compra: Compra) => {
    if (filter === 'Todos') return true;
    if (filter === 'Pendente') return compra.CART_STATUS === 'active';
    if (filter === 'Concluído') return compra.CART_STATUS === 'completed';
    if (filter === 'Cancelado') return compra.CART_STATUS === 'canceled';
  });

  const rows = filteredCompra?.map((compra: Compra) => (
    <TableRow key={compra._id}>
      <TableCell className="font-medium flex flex-col">
        <div className="text-sm text-muted-foreground mb-1">Ordem #{compra._id}</div>
        <div className="flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusLabelAndClass(compra.CART_STATUS).color} md:hidden`} />
          <span className="text-sm">{formatPrice(compra.CART_PRICE)}</span>
        </div>
      </TableCell>
      <TableCell className="text-end hidden md:table-cell">{formatDate(compra.createdAt)}</TableCell>
      <TableCell className="text-end hidden md:table-cell">
        <div className="flex items-center justify-end">
          <span className="text-sm mr-2">{getStatusLabelAndClass(compra.CART_STATUS).label}</span>
          <div className={`w-2.5 h-2.5 rounded-full ml-1 ${getStatusLabelAndClass(compra.CART_STATUS).color}`} />
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
              <a href={`/transacao/${compra._id}`}>Detalhes</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));

  if (!compras || compras.length === 0) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Transações</h1>
        </div>
        <div
          className="flex flex-1 flex-col gap-4 items-center justify-center rounded-lg shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Vázio</h1>
            <p className="hidden text-sm text-muted-foreground md:inline">Nada por aqui..</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col gap-4 p-4 lg:gap-2 lg:p-6 lg:pb-0">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Transações</h1>
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
                      checked={filter === 'Pendente'}
                      onCheckedChange={() => handleFilterChange('Pendente')}
                    >
                      Pendente
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Concluído'}
                      onCheckedChange={() => handleFilterChange('Concluído')}
                    >
                      Concluído
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filter === 'Cancelado'}
                      onCheckedChange={() => handleFilterChange('Cancelado')}
                    >
                      Cancelado
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0" className="border-0">
                <CardContent className="flex flex-1 flex-col p-0">
                  <ScrollArea className="h-[65vh] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead className='w-3/5 md:w-[40%]'>Compra</TableHead>
                          <TableHead className="w-1/5 md:w-[20%] text-end hidden md:table-cell">Data</TableHead>
                          <TableHead className="w-1/5 md:w-[20%] text-end hidden md:table-cell">Status</TableHead>
                          <TableHead className='w-1/5 md:w-[20%]'>
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