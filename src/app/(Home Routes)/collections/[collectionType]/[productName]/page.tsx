"use client"

import { ProductCarouselImage } from '@/app/_components/ui/productCarouselImage'
import React, { useEffect, useState } from 'react'
import { products } from '../../cc'
import ProductDetails from '@/features/products/components/productDetails'
import ProductListImages from '@/app/_components/ui/productListImages'
import ReviewCard from '@/app/_components/ui/reviewCard'
import AddReview from '@/app/_components/ui/addReview'
import { FetchData } from '@/lib/fetchers/getDatas'
import { Loader2 } from 'lucide-react'

type Props = {
    params: { productName: string }
}

function page({ params }: Props) {
    const { productName } = params
    const title = productName.split("-").join(" ")
    const [activeColor, setActiveColor] = useState("")
    const { data, isLoading }: { data: Product, isLoading: boolean; }
        = FetchData({url:`/api/products?title=${title}`})
    const colors = data?.image.map(img => img.color)
    const img = data?.image.filter(img => img.color === activeColor)

    useEffect(() => {
        if (data) {
            setActiveColor(colors[0])
        }
    }, [data])


    return (
        <main className='Container'>
            {isLoading && (
                <div className='flex items-center justify-center mt-[50px]'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>
            )}
            {data && (
                <>
                    <section className='grid grid-cols-1 gap-8 lg:grid-cols-[200px_400px_1fr] py-[30px]'>
                        <div className='hidden lg:block'>
                            <ProductListImages files={img?.length > 0 ? img[0]?.file : undefined} />
                        </div>
                        <div>
                            <ProductCarouselImage files={img?.length > 0 ? img[0]?.file : undefined} />
                        </div>
                        <ProductDetails data={data || {}} setColor={setActiveColor} activeClr={activeColor} />
                    </section>
                    <section className='pb-12'>
                        <div>
                            <p className='props-title caitalize border-b-2 pb-3' >reviews</p>
                            {/* <hr className='p' /> */}
                            <div className='grid sm:grid-cols-2 lg:grid-cols-4 pt-8 gap-8'>
                                {/* <ReviewCard /> */}
                            </div>
                        </div>
                        <div className='py-[30px]'>
                            <p className='props-title caitalize border-b-2 pb-3' >add review</p>
                            <AddReview id={data?.id} />
                        </div>
                    </section>
                    <section >
                        <p className='props-title' >related </p>
                    </section>
                </>
            )}
        </main>
    )
}

export default page