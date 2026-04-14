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

    const [products, setProducts] = useState<Product[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const router = useRouter()

    useEffect(() => {

        const user = getUser()

        if (!user || user.role !== "ADMIN") {
            router.push("/")
            return
        }

        loadProducts()

    }, [])

    function loadProducts() {
        setProducts(getProducts())
    }

    function handleDeleteConfirm() {
        if (!deleteId) return
        deleteProduct(deleteId)
        setDeleteId(null)
        loadProducts()
    }

    return (

        <div className="p-8 max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link
                    href="/admin/products/create"
                    className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition"
                >
                    + Add Product
                </Link>

            </div>

            {/* LIST */}
            <div className="grid gap-4">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-4 flex justify-between items-center"
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={product.image}
                                alt=""
                                className="w-14 h-14 object-cover rounded-lg"
                            />

                            <div>
                                <h3 className="font-semibold text-lg">
                                    {product.name}
                                </h3>

                                <p className="text-gray-500">
                                    ${product.price}
                                </p>
                            </div>

                        </div>

                        <div className="flex gap-3">

                            <button
                                onClick={() =>
                                    router.push(`/admin/products/edit/${product.id}`)
                                }
                                className="px-3 py-1.5 rounded-lg border hover:bg-gray-100"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => setDeleteId(product.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* MODAL */}
            {deleteId && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px]">

                        <h2 className="text-lg font-semibold mb-2">
                            Delete Product
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Are you sure you want to delete this product?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-lg border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}