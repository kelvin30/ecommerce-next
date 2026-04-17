export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// GET CART
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

// SAVE CART
function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// ADD TO CART
export function addToCart(product: Omit<CartItem, "quantity">) {
  const cart = getCart()

  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  saveCart(cart)
}

// REMOVE ITEM COMPLETELY
export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id)
  saveCart(cart)
}

// INCREASE QUANTITY
export function increaseQty(id: string) {
  const cart = getCart()

  const item = cart.find((i) => i.id === id)
  if (item) item.quantity += 1

  saveCart(cart)
}

// DECREASE QUANTITY
export function decreaseQty(id: string) {
  let cart = getCart()

  const item = cart.find((i) => i.id === id)

  if (item) {
    item.quantity -= 1

    // nëse bëhet 0 → fshi
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== id)
    }
  }

  saveCart(cart)
}

// TOTAL
export function getTotal(cart: CartItem[]) {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
}