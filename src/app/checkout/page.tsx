"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { getUser } from "@/lib/auth"

export default function CheckoutPage() {

    const router = useRouter()

    useEffect(() => {

        const user = getUser()

        if (!user) {

            router.push("/login")

        }

    }, [])

    return (

        <div>

            <h1 className="text-2xl font-bold">

                Checkout

            </h1>

            <p className="mt-2">

                User is logged in ✅

            </p>

        </div>

    )

}