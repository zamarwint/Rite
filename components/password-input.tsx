'use client'

import * as React from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const disabled = props.value === '' || props.value === undefined || props.disabled

        return (
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('hide-password-toggle pr-10', className)}
                    ref={ref}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    disabled={props.disabled}
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword && !disabled ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                </Button>
                {/* Hides native browser password toggles in some browsers */}
                <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'