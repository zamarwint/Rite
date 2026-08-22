import type { Metadata } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = {
    title: "Dashboard | Rite",
    description: "Create your writing space at the speed of thought. Write, organize, and focus like never before.",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </>
    )
}