"use client"
import { ProductColumn } from '@/app/(Dashboard)/admin-dashboard/products/ProductColumn'
import { TableComponent } from '@/components'
import { useFetchData } from '@/hooks'
import React from 'react'

export default function DashboardProductMainLayout() {
    const { data, error, mutate } = useFetchData({ url: '/api/products' })
    console.log(data, error)
    return (
        <div>
            <section>
                {/* {isLoading && <div className='flex items-center justify-center'>
            <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
        </div>} */}
                {
                    data?.length > 0 && (
                        <TableComponent
                            column={ProductColumn} data={data}
                            hrefText='Add User'
                            href='/admin-dashboard/products/add-new-product'
                            path='/admin-dashboard/products/edit-product'
                            pathText='Edit'
                            headerText='Products'
                        />
                    )
                }
                {
                    data?.length === 0 && <div className='flex items-center justify-center mt-12'>
                        <p className='text-[3rem] font-bold capitalize '>No product</p>
                    </div>
                }
            </section>
        </div>
    )
}
