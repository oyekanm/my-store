"use client"

import { CreateProductForm } from '@/features/products/components'
import { useFetchData } from '@/hooks';
import { Loader2 } from 'lucide-react'

type Image = {
    url: string;
    id: string;
    key: string
}

type Props = {
    params: { productId: string }
}

export default function page(props: Props) {
    const { params } = props
    const { productId } = params
    const title = productId.split("-").join(" ")

   

    // Trpc query calls
    const { data,isLoading:productLoading } = useFetchData({url:`/api/products?title=${title}`, refresh:100})


 




    return (
        <div>
            <section >
                {productLoading && !data && <div className='flex items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>}

                <CreateProductForm getProduct={data} editin={true}/>
            </section>
        </div>
    )
}
