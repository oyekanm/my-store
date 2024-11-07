"use client"

import { useFetchData } from '@/hooks';
import ProductCard from './productCard';

type Props = {
    path:string
}

export default function ProductListComponent({path}:Props) {

    const { data, isLoading }: { data: Product[], isLoading: boolean; } = useFetchData({url:'/api/products'})

    console.log(data)

    return (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4 ">
            {
                data?.map(pdt => {
                    return (
                        <div key={pdt.id} className='relative sm:w-[80%] mx-auto'>
                            <ProductCard urls={path} data={pdt}/>
                        </div>)
                })
            }
        </div>
    )
}
