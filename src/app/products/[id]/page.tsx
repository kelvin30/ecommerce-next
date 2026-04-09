"use client"

import { useParams } from "next/navigation"
import { products } from "@/lib/mockProducts"
import { addToCart } from "@/lib/cart"

export default function ProductDetails() {

    const params = useParams()

    const product = products.find(
        p => p.id === params.id
    )

    if (!product) {
        return <div>Product not found</div>
    }

    function handleAddToCart() {

        if (!product) {
            alert("Product not found")
            return
        }

        addToCart(product)

        alert("Added to cart")

    }

    return (

        <div className="grid md:grid-cols-2 gap-8">

            <img
                src={product.image}
                className="rounded-xl"
                alt={product.name}
            />

            <div>

                <h1 className="text-3xl font-bold">
                    {product.name}
                </h1>

                <p className="text-xl mt-2">
                    ${product.price}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
                >
                    Add to cart
                </button>

            </div>

        </div>

    )

}