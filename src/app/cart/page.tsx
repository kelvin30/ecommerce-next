"use client"

import { useEffect, useState } from "react"
import {
    getCart,
    removeFromCart,
    CartItem
} from "@/lib/cart"

export default function CartPage() {

    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {

        setCart(getCart())

    }, [])

    function handleRemove(id: string) {

        removeFromCart(id)

        setCart(getCart())

    }

    if (!cart.length) {
        return <p>Your cart is empty</p>
    }

    return (

        <div>

            <h1 className="text-2xl font-bold mb-4">
                Cart
            </h1>

            <div className="space-y-4">

                {cart.map(item => (

                    <div
                        key={item.id}
                        className="border p-4 flex justify-between"
                    >

                        <div>

                            <h3>
                                {item.name}
                            </h3>

                            <p>
                                ${item.price}
                            </p>

                            <p>
                                Qty: {item.quantity}
                            </p>

                        </div>

                        <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500"
                        >
                            Remove
                        </button>

                    </div>

                ))}

            </div>

        </div>

    )

}