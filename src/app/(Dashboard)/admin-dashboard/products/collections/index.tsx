"use client"

// import Drawer from '@/app/_components/ui/drawer'

import CollectionComponent from './collectionComponent'
import CollectionTypeComponent from './collectionTypeComponent'

export default function CollectionContainer() {
const collections:any[] = []

  // fetching data
  // const { data: collectionTypes }: { data: CollectionType[] } = FetchData({ url: '/api/collectionType' })
  // const { data: collections }: { data: Collection[] } = FetchData({ url: '/api/collections' })

  // data mutations




  //   onError(error) {
  //     if (error?.data?.zodError?.fieldErrors) {
  //       for (const [key, value] of Object.entries(error?.data?.zodError?.fieldErrors)) {
  //         console.log(`${key}: ${value}`);
  //         Toast({ title: `${key}`, description: `${value}`, variant: "destructive" })
  //       }
  //     }
  //   }
  // })




  return (
    <div>
      <CollectionComponent collections={collections}/>
      {/* <CollectionTypeComponent collections={collections} /> */}
    </div >
  )
}
