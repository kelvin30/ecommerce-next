"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProducts, saveProducts, Product } from "@/lib/products"

export default function EditProductPage() {

    const params = useParams()
    const router = useRouter()

    const [product, setProduct] = useState<Product | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {

        const found = getProducts().find(
            p => p.id === params.id
        )

        if (found) setProduct(found)

    }, [])

    function handleSave() {

        if (!product) return

        if (!product.name.trim()) {
            setError("Name required")
            return
        }

        if (product.price <= 0) {
            setError("Invalid price")
            return
        }

        const updated = getProducts().map(p =>
            p.id === product.id ? product : p
        )

        saveProducts(updated)

        router.push("/admin/products")

    }

    function handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()

        reader.onloadend = () => {
            setProduct(prev =>
                prev ? { ...prev, image: reader.result as string } : prev
            )
        }

        reader.readAsDataURL(file)
    }

    if (!product) return <p className="p-6">Loading...</p>

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h1 className="text-2xl font-bold mb-6">
                    Edit Product
                </h1>

                {error && (
                    <p className="text-red-500 mb-3">{error}</p>
                )}

                <input
                    className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-black outline-none"
                    value={product.name}
                    onChange={e =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-black outline-none"
                    value={product.price}
                    onChange={e =>
                        setProduct({ ...product, price: Number(e.target.value) })
                    }
                />

                <label className="inline-block cursor-pointer mb-3">

                    <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border hover:bg-gray-200">
                        📁 Choose Image
                    </span>

                    <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                    />

                </label>

                {product.image && (
                    <img
                        src={product.image}
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                )}

                <button
                    onClick={handleSave}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >
                    Save Changes
                </button>

            </div>

        </div>

    )

}