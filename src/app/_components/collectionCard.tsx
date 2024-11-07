import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Props = {
  item: Collection;
}

function CollectionCard({ item }: Props) {
  const link = item.name.split(" ").join("-");

  return (
    <div className="relative w-full h-[35rem]">
      {/* TODO: add IMAGE from Nextjs */}
      <Link href={`/collections/${link}`} passHref>
        <img
          src="https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format"
          alt="Ankara collection background"
          className='w-full h-full'
        // layout="fill"
        // objectFit="cover"
        />
      </Link>
        <div className="absolute inset-0 lg:inset-[0_0_1rem] flex flex-col justify-end p-4">
          <div className="grid gap-4">
            <p className="text-[1.6rem] font-bold uppercase text-white">ankara</p>
            <p className="text-[1.2rem] font-medium text-white">
              Very great wears here. hshdgs jgdh sghs dgs hdghsd
            </p>
            <Link href={`/collections/${link}`} passHref>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-8 rounded-none w-1/2 bg-white hover:bg-white">
                <span className="text-[1.4rem] font-bold uppercase text-black">
                  shop now
                </span>
              </button>
            </Link>
          </div>
        </div>
    </div>

    // <Link href={`/collections/${link}`}>
    //   <div className={`flex flex-col justify-end p-4 items-start w-[100%] h-[35rem] mx-auto bg-cover bg-center bg-no-repeat bg-[url(https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format)]`} >
    //     <div className='grid gap-4'>
    //       <p className='text-[1.6rem] font-bold uppercase text-white'>{item.name}</p>
    //       <p className='text-[1.2rem] font-medium  text-white'>Very great wears here. hshdgs jgdh sghs dgs hdghsd</p>
    //       <Button className='py-8 rounded-none w-1/2 bg-white hover:bg-white' variant={'default'}>
    //         <Link href={`/collections/${link}`}
    //           className='text-[1.4rem] font-bold uppercase text-black'>
    //           shop now
    //         </Link>
    //       </Button>
    //     </div>
    //   </div>
    // </Link>
  )
}

export default CollectionCard