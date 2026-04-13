import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import InitProducts from "@/components/InitProducts"

export const metadata = {
  title: "Ecommerce",
  description: "Next.js ecommerce app"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body>

        <InitProducts /> {/* 👈 kjo është zgjidhja */}

        <Navbar />

        {children}

      </body>

    </html>

  )

}