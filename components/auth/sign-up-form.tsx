'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from '@/components/ui/input'
import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/signUpSchema'
import { Loader } from 'lucide-react'
import { PasswordInput } from '../password-input'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [signUpPending, startSignUpTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  })

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    startSignUpTransition(async () => {
      const supabase = createClient()
      setError(null)

      try {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/~`,
            data: {
              full_name: data.fullName,
            }
          },
        })
        if (error) throw error
        router.push('/sign-up-success')
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Eg. John Doe"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className='h-12'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className='h-12'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className='h-12'
                      placeholder='••••••••••••••••'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>

                )}
              />
              <Controller
                name="repeatPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="grid gap-2">
                    <FieldLabel htmlFor="repeat-password">Repeat Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className='h-12'
                      placeholder='••••••••••••••••'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full h-12" disabled={signUpPending}>
                {signUpPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <span>Creating an account...</span>
                  </>
                ) : 'Sign up'}
              </Button>
            </FieldGroup>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
