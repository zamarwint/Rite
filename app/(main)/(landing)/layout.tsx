"use client";

import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function LandingPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col h-full w-screen overflow-x-hidden">
            <Header />
            {children}
            <Footer />
        </div>
    )
}