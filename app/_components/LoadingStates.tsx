'use client';

import { useTheme } from "next-themes";
import Image from "next/image";

export function LogoLoadingState({ text }: { text: string }) {
    const { resolvedTheme } = useTheme();

    return (
        <div className='flex items-center gap-2'>
            {resolvedTheme === 'light' ? (
                <Image
                    src="/logos/loading-state-dark.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className='size-4 animate-spin'
                    loading='eager'
                />
            ) : (
                <Image
                    src="/logos/loading-state-light.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className='size-4 animate-spin'
                    loading='eager'
                />
            )}
            <span className="animate-pulse">{text}</span>
        </div>
    )
}