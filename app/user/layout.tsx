import type { Metadata } from "next"
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
    title: "Dashboard | Rite",
    description: "Create your writing space at the speed of thought. Write, organize, and focus like never before.",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Redirects to the sign-in route if the user is not signed in
    await auth.protect()

    return (
        <>
            {children}
        </>
    )
}