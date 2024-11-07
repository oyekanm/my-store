import React from 'react'
import { collections, products, collectionType as CT } from '../cc'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '@/app/_components/productCard'
import CollectionTypeCard from '@/app/_components/CollectionTypeCard'
import { Heart } from 'lucide-react'
import { FetchData } from '@/lib/fetchers/getDatas'
import ProductListComponent from '@/features/products/components/productListComponent'


type Props = {
    params: { collectionType: string }
}

function page({ params }: Props) {

    const { collectionType } = params
    const id = collections.filter(cc => cc.name === collectionType).map(cc => cc.id)[0]
    const CTs = CT.filter(ct => ct.collectionId === id)
    // console.log(CT,id, collectionType)
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    // console.log(data)

    return (
        <main className='Container' >
            <section>
                <p className='text-[4rem] font-bold uppercase '>{collectionType}</p>
                <div className='flex gap-4 pt-12 flex-wrap'>
                    {
                        CTs.map(ct => (
                            <div key={ct.id} className='w-[150px]'>
                                <CollectionTypeCard key={ct.id} item={ct} />
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className='grid grid-cols-[200px_minmax(900px,_1fr)] pt-[30px]'>
                <div></div>
                <div>
                    <ProductListComponent path={collectionType} />
                    {/* {
                        CTs.map(ct => (
                            <div key={ct.id} className='flex flex-col gap-8 pb-12'>
                                <p className='text-[2rem] font-bold uppercase'>{ct.name}</p>
                                <div className="grid grid-cols-3 ">
                                    {
                                        array.map(i => (
                                            <div key={i} className='relative'>
                                                <Button variant={'outline'} className='absolute right-0 border-none hover:bg-transparent'>
                                                    <Heart />
                                                </Button>
                                                <ProductCard key={i} urls={collectionType} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))

                    } */}
                </div>
            </section>

        </main>
    )
}

export default page