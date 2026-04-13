"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addProduct } from "@/lib/products"

export default function CreateProductPage() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")

    function handleCreate() {

        const newProduct = {
            id: Date.now().toString(),
            name,
            price: Number(price),
            image
        }

        addProduct(newProduct)

        alert("Product created")

        router.push("/admin/products")

    }

    return (

        <div className="p-6 max-w-md">

            <h1 className="text-2xl font-bold mb-4">
                Create Product
            </h1>

            <input
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Price"
                className="border p-2 w-full mb-2"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <input
                placeholder="Image URL"
                className="border p-2 w-full mb-2"
                value={image}
                onChange={e => setImage(e.target.value)}
            />

            <button
                onClick={handleCreate}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Create
            </button>

        </div>

    )

}