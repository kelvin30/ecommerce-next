"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    getProducts,
    deleteProduct,
    Product
} from "@/lib/products"

import { getUser } from "@/lib/auth"

export default function AdminProductsPage() {

    const [products, setProducts] =
        useState<Product[]>([])

    const router = useRouter()

    // 🔐 Admin protection
    useEffect(() => {

        const user = getUser()

        if (!user || user.role !== "ADMIN") {

            alert("Not authorized")

            router.push("/")

            return
        }

        loadProducts()

    }, [])

    function loadProducts() {

        setProducts(getProducts())

    }

    function handleDelete(id: string) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        )

        if (!confirmed) return

        deleteProduct(id)

        loadProducts()

    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Admin Products
            </h1>

            {/* ➕ Create Product */}
            <Link
                href="/admin/products/create"
                className="inline-block mb-6 bg-black text-white px-4 py-2 rounded"
            >
                + Create Product
            </Link>

            <div className="space-y-4">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="border p-4 flex justify-between items-center rounded"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {product.name}
                            </h3>

                            <p className="text-gray-600">
                                ${product.price}
                            </p>

                        </div>

                        <div className="flex gap-3">

                            {/* ✏️ Edit */}
                            <button
                                onClick={() =>
                                    router.push(`/admin/products/edit/${product.id}`)
                                }
                                className="text-blue-500"
                            >
                                Edit
                            </button>

                            {/* ❌ Delete */}
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )

}