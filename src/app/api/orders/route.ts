import { prisma } from "@/lib/prisma"

// GET ALL ORDERS (ADMIN)
export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return Response.json(orders)
}

// CREATE ORDER (CHECKOUT)
export async function POST(req: Request) {
  const body = await req.json()

  const { items, total } = body

  const order = await prisma.order.create({
    data: {
      total,
      items: {
        create: items.map((item: any) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      }
    },
    include: {
      items: true
    }
  })

  return Response.json(order)
}