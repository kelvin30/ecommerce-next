"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProducts, saveProducts, Product } from "@/lib/products"

export default function EditProductPage() {

    const params = useParams()
    const router = useRouter()

    const [product, setProduct] =
        useState<Product | null>(null)

    useEffect(() => {

        const products = getProducts()

        const found = products.find(
            p => p.id === params.id
        )

        if (found) {
            setProduct(found)
        }

    }, [])

    function handleSave() {

        if (!product) return

        const products = getProducts().map(p =>
            p.id === product.id ? product : p
        )

        saveProducts(products)

        alert("Product updated")

        router.push("/admin/products")

    }

    if (!product) {

        return <p>Loading...</p>

    }

    return (

        <div className="p-6 max-w-md">

            <h1 className="text-2xl font-bold mb-4">
                Edit Product
            </h1>

            <input
                className="border p-2 w-full mb-2"
                value={product.name}
                onChange={e =>
                    setProduct({
                        ...product,
                        name: e.target.value
                    })
                }
            />

            <input
                className="border p-2 w-full mb-2"
                value={product.price}
                onChange={e =>
                    setProduct({
                        ...product,
                        price: Number(e.target.value)
                    })
                }
            />

            <input
                className="border p-2 w-full mb-2"
                value={product.image}
                onChange={e =>
                    setProduct({
                        ...product,
                        image: e.target.value
                    })
                }
            />

            <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Save
            </button>

        </div>

    )

}