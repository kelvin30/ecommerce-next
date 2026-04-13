"use client"

import { useEffect } from "react"
import { getProducts, saveProducts } from "@/lib/products"
import { products as mockProducts } from "@/lib/mockProducts"

export default function InitProducts() {

    useEffect(() => {

        const existing = getProducts()

        if (!existing.length) {

            saveProducts(mockProducts)

        }

    }, [])

    return null

}