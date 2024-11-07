import ProductListComponent from '@/features/products/components/productListComponent'
import FilterComponent from '@/components/reuseable/filterComponent'
import SectionWithTitleAndDesc from '@/components/reuseable/sectionWithTitleAndDesc'




function page() {
    return (
        <main className='Container' >
            <SectionWithTitleAndDesc
                title={`best sellers`}
                desc={`One of our best selling collections`}
            >
                <p className='hidden' >none</p>
            </SectionWithTitleAndDesc>
            <section className='Container grid lg:grid-cols-[200px_minmax(700px,_1fr)] pt-4 gap-8 lg:gap-4'>
                <FilterComponent />
                <ProductListComponent path={"collType"} />
            </section>

        </main>
    )
}

export default page