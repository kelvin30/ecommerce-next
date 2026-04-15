let products = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    image: ""
  }
]

// GET ALL PRODUCTS
export async function GET() {
  return Response.json(products)
}

// CREATE PRODUCT
export async function POST(req: Request) {

  const body = await req.json()

  const newProduct = {
    id: Date.now().toString(),
    ...body
  }

  products.push(newProduct)

  return Response.json(newProduct)
}

// UPDATE PRODUCT
export async function PUT(req: Request) {

  const updatedProduct = await req.json()

  products = products.map(p =>
    p.id === updatedProduct.id ? updatedProduct : p
  )

  return Response.json(updatedProduct)

}

// DELETE PRODUCT
export async function DELETE(req: Request) {

  const { id } = await req.json()

  products = products.filter(p => p.id !== id)

  return Response.json({ success: true })

}