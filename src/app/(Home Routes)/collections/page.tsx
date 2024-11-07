import React from 'react'
import { collections } from './cc'
import CollectionCard from '@/app/_components/collectionCard'



export default function page() {
  return (
    <main className="Container my-[40px]">
      <section >
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {collections.map(cc => {
            return (
              <div key={cc.id} className=''>
                <CollectionCard item={cc} key={cc.id}/>
              </div>)
          })}
        </div>
      </section>
    </main>
  )
}
