import NotFoundComponent from "./_components/NotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 | Page Not Found",
    description: "The page you are looking for does not exist.",
    metadataBase: new URL("https://ritewriting.in"),
    openGraph: {
        title: "404 | Page Not Found",
        description: "The page you are looking for does not exist.",
        url: "https://ritewriting.in",
        siteName: "Rite Writing",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "404 | Page Not Found",
        description: "The page you are looking for does not exist.",
        images: ["/og-image.png"],
    },
    robots: {
        index: false,
        follow: false,
    },
}

export default function NotFoundPage() {
    return (
        <NotFoundComponent />
    )
}