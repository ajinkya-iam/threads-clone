import React from "react";
import { Inter } from "next/font/google"
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
    title: "Threads",
    description: "A Next.js 13 Metadata Theards"
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}