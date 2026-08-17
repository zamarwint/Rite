import { DashboardView } from "./_components/DashboardView";
import { auth } from '@clerk/nextjs/server'

export default async function DashboardPage() {
    // Redirects to the sign-in route if the user is not signed in
    await auth.protect()

    return (
        <DashboardView />
    )
}