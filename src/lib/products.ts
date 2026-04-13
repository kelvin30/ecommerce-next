export type Product = {
  id: string
  name: string
  price: number
  image: string
}

const PRODUCTS_KEY = "products"

export function getProducts(): Product[] {

  if (typeof window === "undefined")
    return []

  const data =
    localStorage.getItem(PRODUCTS_KEY)

  if (data) {
    return JSON.parse(data)
  }

  return []

}

export function saveProducts(products: Product[]) {

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  )

}

export function addProduct(product: Product) {

  const products = getProducts()

  products.push(product)

  saveProducts(products)

}

export function deleteProduct(id: string) {

  const products =
    getProducts().filter(
      p => p.id !== id
    )

  saveProducts(products)

}