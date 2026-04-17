"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Product = {
    id: string
    name: string
    price: number
    image?: string
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            const res = await fetch("/api/products")
            const data = await res.json()
            setProducts(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Products
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition block"
                    >
                        {product.image && (
                            <img
                                src={product.image}
                                className="h-40 w-full object-cover mb-3 rounded"
                            />
                        )}

                        <h2 className="font-semibold">
                            {product.name}
                        </h2>

                        <p className="text-gray-500">
                            ${product.price}
                        </p>
                    </Link>
                ))}

            </div>

        </div>
    )
}