'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { cn } from '@/lib/utils'
import { safeNextPath } from '@/lib/safe-next-path'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { PasswordInput } from '../password-input'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loginPending, startLoginTransition] = useTransition();
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    startLoginTransition(async () => {
      const supabase = createClient()
      setError(null)

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        // Update this route to redirect to an authenticated route. The user already has an active session.
        const next = new URLSearchParams(window.location.search).get('next')
        router.push(safeNextPath(next, '/~'))
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-12'
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-12'
                  placeholder='••••••••••••••••'
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full h-12" disabled={loginPending}>
                {loginPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
