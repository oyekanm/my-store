import ProductListComponent from '@/features/products/components/productListComponent'
import FilterComponent from '@/components/reuseable/filterComponent'
import SectionWithTitleAndDesc from '@/components/reuseable/sectionWithTitleAndDesc'


type Props = {
    params: { collType: string }
}

function page({ params }: Props) {

    const { collType } = params
    // console.log(data)

    return (
        <main className='Container' >
            <SectionWithTitleAndDesc
                title={`${collType}`}
                desc={`One of our best selling collections`}
            >
                <p className='hidden' >none</p>
            </SectionWithTitleAndDesc>
            <section className='grid lg:grid-cols-[200px_minmax(700px,_1fr)] pt-4 gap-8 lg:gap-4'>
                <FilterComponent />
                <ProductListComponent path={collType} />
            </section>
            <SectionWithTitleAndDesc
                title={`you may also like`}
            >
                <p className='hidden' >none</p>
            </SectionWithTitleAndDesc>
        </main>
    )
}

export default page