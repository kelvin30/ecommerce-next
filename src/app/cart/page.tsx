"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
    getCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    CartItem
} from "@/lib/cart"

export default function CartPage() {

    const [cart, setCart] = useState<CartItem[]>([])

    const router = useRouter()

    function loadCart() {

        setCart(getCart())

    }

    useEffect(() => {

        loadCart()

    }, [])

    function handleRemove(id: string) {

        removeFromCart(id)

        loadCart()

    }

    function handleIncrease(id: string) {

        increaseQty(id)

        loadCart()

    }

    function handleDecrease(id: string) {

        decreaseQty(id)

        loadCart()

    }

    if (!cart.length) {

        return (

            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Cart
                </h1>

                <p className="mt-4">
                    Your cart is empty
                </p>

            </div>

        )

    }

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    )

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Cart
            </h1>

            <div className="space-y-4">

                {cart.map(item => (

                    <div
                        key={item.id}
                        className="border rounded-xl p-4 flex justify-between items-center"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {item.name}
                            </h3>

                            <p className="text-gray-600">
                                ${item.price}
                            </p>

                            <div className="flex items-center gap-2 mt-2">

                                <button
                                    onClick={() => handleDecrease(item.id)}
                                    className="px-3 py-1 border rounded"
                                >
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => handleIncrease(item.id)}
                                    className="px-3 py-1 border rounded"
                                >
                                    +
                                </button>

                            </div>

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

            <div className="mt-8">

                <h2 className="text-xl font-semibold">

                    Total: ${total}

                </h2>

                <button
                    onClick={() => router.push("/checkout")}
                    className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
                >

                    Checkout

                </button>

            </div>

        </div>

    )

}