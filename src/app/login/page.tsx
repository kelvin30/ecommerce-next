"use client"

import { useRouter } from "next/navigation"
import { loginFake } from "@/lib/auth"

export default function LoginPage() {

    const router = useRouter()

    function handleLogin() {

        loginFake()

        router.push("/checkout")

    }

    return (

        <div className="max-w-md mx-auto mt-10">

            <h1 className="text-2xl font-bold mb-4">

                Login

            </h1>

            <button
                onClick={handleLogin}
                className="bg-black text-white px-6 py-2 rounded"
            >

                Login as test user

            </button>

        </div>

    )

}