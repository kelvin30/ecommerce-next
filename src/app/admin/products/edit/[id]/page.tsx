"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProducts } from "@/lib/products"
import { updateProduct } from "@/lib/products"

type Product = {
    id: string
    name: string
    price: number
    image: string
}

export default function EditProductPage() {

    const params = useParams()
    const router = useRouter()

    const [product, setProduct] = useState<Product | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    // 📥 LOAD PRODUCT FROM API
    useEffect(() => {

        async function loadProduct() {

            try {
                const products = await getProducts()

                const found = products.find(
                    (p: Product) => p.id === params.id
                )

                if (found) {
                    setProduct(found)
                }

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }

        }

        loadProduct()

    }, [])

    // 💾 SAVE 
    async function handleSave() {

        if (!product) return

        if (!product.name.trim()) {
            setError("Product name is required")
            return
        }

        if (product.price <= 0) {
            setError("Price must be greater than 0")
            return
        }

        try {

            await updateProduct(product)

            alert("Product updated successfully")

            router.push("/admin/products")

        } catch (err) {
            console.error(err)
            setError("Update failed")
        }

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

    if (loading) {
        return <p className="p-6">Loading...</p>
    }

    if (!product) {
        return <p className="p-6">Product not found</p>
    }

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
                    className="w-full border p-3 rounded-lg mb-3"
                    value={product.name}
                    onChange={e =>
                        setProduct({ ...product, name: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded-lg mb-3"
                    value={product.price}
                    onChange={e =>
                        setProduct({
                            ...product,
                            price: Number(e.target.value)
                        })
                    }
                />

                {/* 📸 CUSTOM BUTTON */}
                <label className="inline-block cursor-pointer mb-3">

                    <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border transition">
                        Change Image
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
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    Save Changes
                </button>

            </div>

        </div>

    )

}