import { LogoLoadingState } from "./_components/LoadingStates";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <LogoLoadingState text="Preparing your sanctuary..." />
        </div>
    )
}