'use client';

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { useTheme } from 'next-themes';
import { DotPattern } from '@/components/ui/dot-pattern';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function SignInComponent() {
    const { resolvedTheme } = useTheme();
    const router = useRouter();
    return (
        <div className='flex flex-col items-center justify-center gap-5 w-screen h-screen bg-background/10'>
            {/* Logo */}
            <div className="flex items-center space-x-2 z-999 cursor-pointer" onClick={() => router.push('/')}>
                {resolvedTheme === 'light' ? (
                    <Image
                        src="/logos/logo2.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className='w-14 h-14'
                        loading='eager'
                    />
                ) : (
                    <Image
                        src="/logos/logo.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className='w-14 h-14'
                        loading='eager'
                    />
                )}
                <div className="flex flex-col">
                    <span className="font-serif text-2xl font-black tracking-tight text-white leading-none">
                        Rite<span className="text-primary">.</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/80 font-semibold">
                        Distraction-Free Suite
                    </span>
                </div>
            </div>
            <div className='z-999'><SignIn /></div>
            <Button className='z-999 cursor-pointer p-4' onClick={() => router.back()}>
                <ArrowLeft />
                <span>Go Back</span>
            </Button>
            <DotPattern className='absolute inset-0 z-10' />
        </div>
    )
}