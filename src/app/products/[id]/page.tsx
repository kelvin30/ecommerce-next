"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { addToCart } from "@/lib/cart"

type Product = {
    id: string
    name: string
    price: number
    image?: string
    description?: string
}

export default function ProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        fetchProduct()
    }, [])

    async function fetchProduct() {
        try {
            const res = await fetch("/api/products")
            const data = await res.json()

            const found = data.find((p: Product) => p.id === params.id)

            setProduct(found || null)
        } catch (err) {
            console.error(err)
        }
    }

    if (!product) {
        return <p className="p-6">Product not found</p>
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            {product.image && (
                <img
                    src={product.image}
                    className="w-full h-80 object-cover rounded mb-6"
                />
            )}

            <h1 className="text-2xl font-bold mb-2">
                {product.name}
            </h1>

            <p className="text-gray-500 mb-4">
                ${product.price}
            </p>

            <p className="mb-6">
                {product.description}
            </p>

            <button
                onClick={() =>
                    addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || ""
                    })
                }
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
                Add to Cart
            </button>

        </div>
    )
}