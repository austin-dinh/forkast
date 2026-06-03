import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forkast",
  description: "Table reservation system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  )
}
