import { prisma } from "@/lib/prisma"

// GET ALL
export async function GET() {
  const products = await prisma.product.findMany()
  return Response.json(products)
}

// CREATE
export async function POST(req: Request) {
  const body = await req.json()

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      image: body.image,
      description: body.description
    }
  })

  return Response.json(product)
}

// UPDATE
export async function PUT(req: Request) {
  const body = await req.json()

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      price: body.price,
      image: body.image,
      description: body.description
    }
  })

  return Response.json(product)
}

// DELETE
export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.product.delete({
    where: { id }
  })

  return Response.json({ success: true })
}