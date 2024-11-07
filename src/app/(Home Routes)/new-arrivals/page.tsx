import ProductListComponent from '@/features/products/components/productListComponent'
import FilterComponent from '@/components/reuseable/filterComponent'
import SectionWithTitleAndDesc from '@/components/reuseable/sectionWithTitleAndDesc'
import { db } from '@/config/db'

async function page() {

    const newArrivals = await db.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    })
    console.log(newArrivals)


    return (
        <main className='Container' >
            <SectionWithTitleAndDesc
                title={`new arrivals`}
                desc={`One of our best selling collections`}
            >
                <p className='hidden' >none</p>
            </SectionWithTitleAndDesc>
            <section className='grid lg:grid-cols-[200px_minmax(700px,_1fr)] pt-4 gap-8 lg:gap-4'>
                <FilterComponent />
                <ProductListComponent path={""} />
            </section>

        </main>
    )
}

export default page