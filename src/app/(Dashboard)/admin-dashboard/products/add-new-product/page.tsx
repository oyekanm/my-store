"use client"

import { CreateProductForm } from '@/features/products/components'
import { useProductStore } from '@/features/products/store/hooks'
import { useFetchData } from '@/hooks'

export default function page() {
    const { productInfo } = useProductStore()



    // fetching data

    const { data } = useFetchData({ url: `/api/products?title=${productInfo.title}`, refresh: 100 })



    //     onError(error) {
    //         // console.log(error.data)
    //         if (error?.data?.zodError?.fieldErrors) {
    //             for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
    //                 console.log(`${key}: ${value}`);
    //                 Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })

    return (
        <>
            {/* show toast on mutation success */}
            {/* {toastOpen ? <Toast title='Success' description={`${productInfo.title} created successfully!!`}  /> : null} */}

            <CreateProductForm getProduct={data} />
        </>
    )
}
