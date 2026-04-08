import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="border-b">

            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

                <Link href="/" className="font-bold text-xl">
                    MyStore
                </Link>

                <div className="flex gap-6">

                    <Link href="/products">
                        Products
                    </Link>

                    <Link href="/cart">
                        Cart
                    </Link>

                    <Link href="/admin/dashboard">
                        Admin
                    </Link>

                </div>

            </div>

        </nav>
    )
}