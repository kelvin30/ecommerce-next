"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    getProducts,
    deleteProduct
} from "@/lib/products"

import { getUser } from "@/lib/auth"

type Product = {
    id: string
    name: string
    price: number
    image: string
}

export default function AdminProductsPage() {

    const [products, setProducts] = useState<Product[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    // 🔐 Admin protection + load data
    useEffect(() => {

        const user = getUser()

        if (!user || user.role !== "ADMIN") {
            router.push("/")
            return
        }

        loadProducts()

    }, [])

    // 📥 GET products (API)
    async function loadProducts() {

        try {
            setLoading(true)

            const data = await getProducts()
            setProducts(data)

        } catch (error) {
            console.error("Error loading products:", error)
        } finally {
            setLoading(false)
        }

    }

    // ❌ DELETE product
    async function handleDeleteConfirm() {

        if (!deleteId) return

        try {
            await deleteProduct(deleteId)
            setDeleteId(null)
            loadProducts()
        } catch (error) {
            console.error("Delete failed:", error)
        }

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

            {/* LOADING */}
            {loading && (
                <p className="text-gray-500">
                    Loading products...
                </p>
            )}

            {/* EMPTY STATE */}
            {!loading && products.length === 0 && (
                <p className="text-gray-500">
                    No products found.
                </p>
            )}

            {/* PRODUCTS LIST */}
            <div className="grid gap-4">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="bg-white shadow-sm hover:shadow-md transition rounded-2xl p-4 flex justify-between items-center"
                    >

                        <div className="flex items-center gap-4">

                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt=""
                                    className="w-14 h-14 object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                    No Img
                                </div>
                            )}

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

                            {/* EDIT */}
                            <button
                                onClick={() =>
                                    router.push(`/admin/products/edit/${product.id}`)
                                }
                                className="px-3 py-1.5 rounded-lg border hover:bg-gray-100 transition"
                            >
                                Edit
                            </button>

                            {/* DELETE */}
                            <button
                                onClick={() => setDeleteId(product.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* 🔥 DELETE MODAL */}
            {deleteId && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

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
                                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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