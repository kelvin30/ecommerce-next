"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCart, getTotal, CartItem } from "@/lib/cart"

export default function CheckoutPage() {
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCart(getCart())
    }, [])

    async function placeOrder() {
        if (cart.length === 0) return

        setLoading(true)

        try {
            await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cart,
                    total: getTotal(cart)
                })
            })

            localStorage.removeItem("cart")
            setCart([])

            alert("Order placed successfully!")

            router.push("/")

        } catch (err) {
            console.error(err)
            alert("Error placing order")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Checkout
            </h1>

            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    <div className="space-y-3">

                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between"
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

                    <div className="mt-6 font-bold flex justify-between">
                        <span>Total</span>
                        <span>${getTotal(cart)}</span>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={loading}
                        className="mt-6 w-full bg-black text-white py-3 rounded"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </>
            )}

        </div>
    )
}