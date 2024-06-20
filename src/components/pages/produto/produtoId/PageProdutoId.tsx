import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PageProdutoId({ produto, categorias }: any) {
  console.log('prod', produto)
  console.log(categorias)
  //TODO começar pelos modais nos icones de editar
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Editar produto</h1>
        </div>
        <div
          className="flex flex-1 justify-center rounded-lg shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <Card className="w-full pt-5 border-0">
            <CardContent>
              <div className="mb-5">
                <div className="text-muted-foreground md:inline">Nome</div>
                <div className="font-medium">{produto.PRODUCT_NAME}</div>
              </div>
              <div className="mb-5">
                <div className="text-muted-foreground md:inline">Categoria</div>
                <div className="font-medium">{produto.PRODUCT_CATEGORY}</div>
              </div>
              <div className="mb-5">
                <div className="text-muted-foreground md:inline">Preço</div>
                <div className="font-medium">{produto.PRODUCT_PRICE}</div>
              </div>
              <div className="mb-5">
                <div className="text-muted-foreground md:inline">Estoque</div>
                <div className="font-medium">{produto.PRODUCT_QUANTITY}</div>
              </div>
              <div className="mb-5">
                <div className="text-muted-foreground md:inline">Status</div>
                <div className="font-medium">{produto.PRODUCT_DELETED ? 'Indisponível' : 'Disponível'}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}