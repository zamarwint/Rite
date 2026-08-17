'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundComponent() {
    const { resolvedTheme } = useTheme();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
            {resolvedTheme === 'light' ? (
                <Image
                    src="/logos/loading-state-light.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className='size-50 animate-spin'
                    loading='eager'
                />
            ) : (
                <Image
                    src="/logos/loading-state-dark.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className='size-50 animate-pulse'
                    loading='eager'
                />
            )}
            <div className="flex flex-col items-center gap-6 w-full">
                <h1 className="text-8xl font-bold">404</h1>
                <h2 className="text-xl font-semibold">Page Not Found.</h2>
                <Separator />
                <p className="text-lg">Please check the URL and try again.</p>
            </div>
            <Button onClick={() => router.back()} className='px-12 py-8 flex items-center justify-center gap-2 cursor-pointer'>
                <ArrowLeft className="size-5 transition-transform duration-300 " />
                <span className="font-medium text-lg">Go Back</span>
            </Button>
        </div>
    )
}