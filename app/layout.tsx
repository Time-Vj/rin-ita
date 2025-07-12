import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rinnova Italia - Efficienza Energetica Roma | Ristrutturazioni Sostenibili",
  description:
    "Rinnova Italia è il tuo partner per l'efficienza energetica a Roma. Consulenze personalizzate, ristrutturazioni eco-sostenibili e prodotti eco-friendly per ridurre i consumi energetici. Sede a Piazzale Clodio 9.",
  keywords:
    "efficienza energetica Roma, ristrutturazioni sostenibili, risparmio energetico, consulenza energetica, prodotti eco-friendly, Prati Roma, Piazzale Clodio",
  authors: [{ name: "Rinnova Italia" }],
  creator: "Rinnova Italia",
  publisher: "Rinnova Italia",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.rinnovaitalia.it",
    title: "Rinnova Italia - Efficienza Energetica Roma",
    description:
      "Il tuo partner per l'efficienza energetica a Roma. Consulenze, ristrutturazioni e prodotti eco-friendly.",
    siteName: "Rinnova Italia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rinnova Italia - Efficienza Energetica Roma",
    description:
      "Il tuo partner per l'efficienza energetica a Roma. Consulenze, ristrutturazioni e prodotti eco-friendly.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#40a644",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="canonical" href="https://www.rinnovaitalia.it" />
        <meta name="geo.region" content="IT-RM" />
        <meta name="geo.placename" content="Roma" />
        <meta name="geo.position" content="41.912;12.457" />
        <meta name="ICBM" content="41.912, 12.457" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
