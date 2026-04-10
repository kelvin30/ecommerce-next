export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

const CART_KEY = "cart"

export function getCart(): CartItem[] {

  if (typeof window === "undefined") return []

  const cart = localStorage.getItem(CART_KEY)

  return cart ? JSON.parse(cart) : []

}

export function addToCart(product: Omit<CartItem, "quantity">) {

  const cart = getCart()

  const existing = cart.find(
    item => item.id === product.id
  )

  if (existing) {

    existing.quantity++

  } else {

    cart.push({
      ...product,
      quantity: 1
    })

  }
  

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  )

}

export function removeFromCart(id: string) {

  const cart = getCart().filter(
    item => item.id !== id
  )

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  )

}

export function increaseQty(id: string) {

  const cart = getCart()

  const item = cart.find(
    i => i.id === id
  )

  if (item) {
    item.quantity++
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  )

}

export function decreaseQty(id: string) {

  let cart = getCart()

  const item = cart.find(
    i => i.id === id
  )

  if (!item) return

  item.quantity--

  if (item.quantity <= 0) {

    cart = cart.filter(
      i => i.id !== id
    )

  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  )

}