"use client"

import Link from "next/link"
import { useCart } from "@/hooks/useCart"

export default function Navbar() {

    const { totalItems } = useCart()

    return (

        <nav className="flex justify-between p-4 border-b">

            <Link href="/">
                Shop
            </Link>

            <div className="flex gap-4">

                <Link href="/products">
                    Products
                </Link>

                <Link href="/cart">

                    Cart 🛒 ({totalItems})

                </Link>

            </div>

        </nav>

    )

}