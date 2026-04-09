import Link from "next/link"

type Props = {
    id: string
    name: string
    price: number
    image: string
}

export default function ProductCard({
    id,
    name,
    price,
    image
}: Props) {

    return (

        <Link href={`/products/${id}`}>

            <div className="border rounded-xl p-4 hover:shadow-md transition">

                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="mt-2 font-semibold">
                    {name}
                </h3>

                <p className="text-gray-500">
                    ${price}
                </p>

            </div>

        </Link>

    )
}