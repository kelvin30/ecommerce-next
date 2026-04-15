export async function getProducts() {

  const res = await fetch("/api/products")
  return res.json()

}

export async function addProduct(product: any) {

  await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product)
  })

}

export async function updateProduct(product: any) {

  await fetch("/api/products", {
    method: "PUT",
    body: JSON.stringify(product)
  })

}

export async function deleteProduct(id: string) {

  await fetch("/api/products", {
    method: "DELETE",
    body: JSON.stringify({ id })
  })

}