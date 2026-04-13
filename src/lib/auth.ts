// src/lib/auth.ts

const USER_KEY = "user"

export function loginFake() {

  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      role: "ADMIN",
      email: "admin@test.com"
    })
  )

}

export function logoutFake() {

  localStorage.removeItem(USER_KEY)

}

export function getUser() {

  if (typeof window === "undefined")
    return null

  const user = localStorage.getItem(USER_KEY)

  return user ? JSON.parse(user) : null

}