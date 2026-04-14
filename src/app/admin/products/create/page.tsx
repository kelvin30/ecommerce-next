"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProduct } from "@/lib/products"

export default function CreateProductPage() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    function handleCreate() {

        if (!name.trim()) {
            setError("Product name is required")
            return
        }

        if (Number(price) <= 0) {
            setError("Price must be greater than 0")
            return
        }

        if (!image) {
            setError("Image is required")
            return
        }

        addProduct({
            id: Date.now().toString(),
            name,
            price: Number(price),
            image
        })

        router.push("/admin/products")

    }

    function handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = e.target.files?.[0]

        if (!file) return

        const reader = new FileReader()

        reader.onloadend = () => {
            setImage(reader.result as string)
        }

        reader.readAsDataURL(file)

    }

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h1 className="text-2xl font-bold mb-6">
                    Create Product
                </h1>

                {error && (
                    <p className="text-red-500 mb-3">{error}</p>
                )}

                <input
                    placeholder="Product Name"
                    className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-black outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Price"
                    className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-black outline-none"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                {/* 📸 FILE INPUT */}
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

                {/* 🔍 PREVIEW */}
                {image && (
                    <img
                        src={image}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                )}

                <button
                    onClick={handleCreate}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Create Product
                </button>

            </div>

        </div>

    )

}