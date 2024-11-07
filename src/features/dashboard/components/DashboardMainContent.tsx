import { Toaster } from '@/components/ui/toaster'
import React from 'react'

export default function DashboardMainContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full lg:ps-[26rem]">
            <div className="p-4  sm:p-6 !pt-8 space-y-4 sm:space-y-6">
                {children}
                <Toaster />
            </div>
        </div>
    )
}
