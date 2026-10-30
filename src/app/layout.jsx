import React from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import ThemeRegistry from "../theme/ThemeRegistry";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import "./global.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["500", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Sheta (ሽታ) | Artisanal & Luxury Perfumes",
  description:
    "Handcrafted luxury fragrances honouring ancient Ethiopian botanical traditions, rare highland frankincense, Semien cedarwood, and Damascene rose extraits.",
  keywords: [
    "Sheta",
    "ሽታ",
    "Ethiopian Perfumes",
    "Artisanal Fragrance",
    "Frankincense Perfume",
    "Luxury Extraits",
    "Highland Scents"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={plusJakarta.className}>
        <ThemeRegistry>
          <CartProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#FAF8F5"
              }}
            >
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
