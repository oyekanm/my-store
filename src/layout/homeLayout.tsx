"use client"

import React, { ReactNode } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { Toaster } from '@/components/ui/toaster'
import { useRecoilState } from 'recoil'
import { cartState } from '@/app/_state/atom/Cartstate'
import { useFetchData } from '@/hooks'

type Props = {
    children: ReactNode
}


export default function HomeLayout({ children }: Props) {
    const [cart, setCart] = useRecoilState(cartState);

    const { data }: { data: Cart[]} = 
    useFetchData({url:`/api/cart?userId=${"clxs63hj10000ltix972685ug"}`, refresh:100,setState:setCart})

    console.log(data,cart)
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
        </>
    )
}
