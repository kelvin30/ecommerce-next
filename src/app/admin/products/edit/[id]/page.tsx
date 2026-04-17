"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getProducts, updateProduct } from "@/lib/products"

export default function EditProductPage() {
    const params = useParams()
    const router = useRouter()

    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        async function load() {
            const data = await getProducts()
            const found = data.find((p: any) => p.id === params.id)
            setProduct(found)
        }

        load()
    }, [])

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setProduct({ ...product, image: reader.result })
        }
        reader.readAsDataURL(file)
    }

    async function handleSave() {
        await updateProduct(product)
        router.push("/admin/products")
    }

    if (!product) return <p>Loading...</p>

    return (
        <div className="p-6 max-w-md mx-auto">

            <input
                className="w-full border p-3 mb-3"
                value={product.name}
                onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                }
            />

            <input
                className="w-full border p-3 mb-3"
                value={product.price}
                onChange={(e) =>
                    setProduct({ ...product, price: Number(e.target.value) })
                }
            />

            <textarea
                className="w-full border p-3 mb-3"
                value={product.description || ""}
                onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                }
            />

            <label className="inline-block cursor-pointer mb-3">
                <span className="bg-gray-100 px-4 py-2 border rounded">
                    Change Image
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>

            {product.image && (
                <img src={product.image} className="w-24 h-24 mb-3" />
            )}

            <button
                onClick={handleSave}
                className="w-full bg-black text-white p-3"
            >
                Save Changes
            </button>

        </div>
    )
}