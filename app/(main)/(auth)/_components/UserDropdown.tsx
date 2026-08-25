'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, ChevronDown, HomeIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupabaseClaims } from "@/types/types";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogoutButton } from "@/components/auth/logout-button";
import { cn } from "@/lib/utils";

function LogOutDialog({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will log you out of your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction render={<LogoutButton />}></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function UserDropdown({ data, full, small }: { data: SupabaseClaims, full: boolean, small: boolean }) {
    const [openLogOut, setOpenLogOut] = useState(false);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button size='icon' className={cn("rounded-sm p-2 flex items-center justify-between size-full", !full && "w-auto")} variant='ghost'>
                    <Avatar>
                        <AvatarImage src={data?.claims.user_metadata?.avatar_url || null} />
                        <AvatarFallback>{data?.claims.user_metadata!.full_name.split(' ')[0][0]}{data?.claims.user_metadata!.full_name.split(' ')[1][0]}</AvatarFallback>
                    </Avatar>
                    {full && <span className='flex flex-col items-start truncate'>
                        <span className='font-bold text-sm leading-tight max-w-35 truncate'>{data?.claims.email}</span>
                        <span className='text-[10px] uppercase font-mono text-muted-foreground tracking-widest'>User</span>
                    </span>}
                    {!small && <ChevronDown />}
                </Button>
            }></DropdownMenuTrigger>
            <DropdownMenuContent align={small ? 'start' : 'end'}>
                <DropdownMenuItem className='cursor-pointer'><HomeIcon /> Profile</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'><SettingsIcon /> Settings</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'><Briefcase /> Workspaces</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={() => setOpenLogOut(!openLogOut)}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
            <LogOutDialog open={openLogOut} setOpen={setOpenLogOut} />
        </DropdownMenu>
    )
}