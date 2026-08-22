import { tryGetClaimsData } from "@/app/actions/getClaimsData";
import { useQuery } from "@tanstack/react-query";

export default function TryGetClaimsDataQuery() {
    return useQuery({
        queryKey: ['claimsData'],
        queryFn: () => tryGetClaimsData(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
