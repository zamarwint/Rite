import type { Metadata } from 'next'
import SignInComponent from './_components/SignIn'

export const metadata: Metadata = {
    title: "Sign In | Rite",
    description: "Sign in to your Rite account.",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

export default function SignInPage() {
    return <SignInComponent />
}