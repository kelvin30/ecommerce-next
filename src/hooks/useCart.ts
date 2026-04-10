"use client"

import { useEffect, useState } from "react"
import { getCart, CartItem } from "@/lib/cart"

export function useCart() {

  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {

    setCart(getCart())

  }, [])

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return {
    cart,
    totalItems,
    refreshCart: () => setCart(getCart())
  }

}