"use client"

import { useEffect, useState } from "react"

type OrderItem = {
    id: string
    name: string
    price: number
    quantity: number
}

type Order = {
    id: string
    total: number
    createdAt: string
    items: OrderItem[]
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders() {
        try {
            const res = await fetch("/api/orders")
            const data = await res.json()
            setOrders(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p className="p-6">Loading...</p>

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Admin Orders
            </h1>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <div className="space-y-6">

                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border p-4 rounded-lg"
                        >

                            <div className="flex justify-between mb-3">

                                <div>
                                    <p className="text-xs text-gray-500">
                                        {order.id}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <p className="font-bold">
                                    ${order.total}
                                </p>

                            </div>

                            <div className="border-t pt-3 space-y-1">

                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {item.name} x {item.quantity}
                                        </span>

                                        <span>
                                            ${item.price * item.quantity}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    )
}