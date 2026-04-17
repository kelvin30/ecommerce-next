"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProduct } from "@/lib/products"

export default function CreateProductPage() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    async function handleCreate() {
        await addProduct({
            name,
            price: Number(price),
            image,
            description
        })

        router.push("/admin/products")
    }

    return (
        <div className="p-6 max-w-md mx-auto">

            <input
                className="w-full border p-3 mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="w-full border p-3 mb-3"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <textarea
                className="w-full border p-3 mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label className="inline-block cursor-pointer mb-3">
                <span className="bg-gray-100 px-4 py-2 border rounded">
                    Choose Image
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>

            {image && (
                <img src={image} className="w-24 h-24 object-cover mb-3" />
            )}

            <button
                onClick={handleCreate}
                className="w-full bg-black text-white p-3"
            >
                Create Product
            </button>

        </div>
    )
}