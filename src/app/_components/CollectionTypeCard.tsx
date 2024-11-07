import React from 'react'
import { DefaultImage } from '@/app/(Home Routes)/layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  item: CollectionType
}

function CollectionTypeCard({ item }: Props) {
  return (
    <div className='w-full mx-auto text-center' >
      {/* <Link href={`/collections/${item.name}`}> */}
        <img src={DefaultImage} alt="deafult image" className='w-full' />
      {/* </Link> */}
      <p className='text-[1.2rem] font-extrabold uppercase'>{item.name}</p>
      {/* <Button className='py-4' variant={'link'}>
        <Link href={`/collections/${item.name}`} className='text-[1.6rem] font-semibold uppercase'>
          shop now
        </Link>
      </Button> */}
    </div>
  )
}

export default CollectionTypeCard