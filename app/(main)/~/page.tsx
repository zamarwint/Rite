import { DashboardView } from "./_components/DashboardView";
import { getClaimsData } from "@/app/actions/getClaimsData";

export default async function DashboardPage() {
    const claimsData = await getClaimsData()

    return (
        <DashboardView data={claimsData} />
    )
}