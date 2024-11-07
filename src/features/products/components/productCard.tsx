"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ThemeColorButton from './themeColorButton';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Image from 'next/image';

type Props = {
  urls: string,
  data: Product
}

function ProductCard({ urls, data }: Props) {
  const { image, price, title } = data
  const [switching, setSwitching] = useState(false)
  const [activeColor, setActiveColor] = useState("")

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  const colors = image.map(img => img.color)
  const link = title.split(" ").join("-")
  const img = image.filter(img => img.color === activeColor)

  useEffect(() => {
    setActiveColor(colors[0])
  }, [])

  console.log(img)
  return (
    <div className='w-full mx-auto text-center pb-8' >
      <Link href={`${urls}/${link}`} className='block relative'>
        <Image
          width={100}
          height={100}
          onMouseOut={() => setSwitching(!switching)}
          onMouseOver={() => setSwitching(!switching)}
          src={
            switching ?
              img[0]?.file[1].url :
              img[0]?.file[0].url}
          alt={title}
          className='w-full h-[270px]' />
        <Button variant={'outline'} className='absolute p-0 size-8 right-4 bottom-4 rounded-[50%] border-none hover:bg-transparent'>
          <Heart size={14}/>
        </Button>
      </Link>
      <p className='text-[1.4rem] font-bold uppercase py-4'>{title}</p>
      <p className='text-[1.4rem] font-semibold capitalize pb-4'>{USDollar.format(price)}</p>
      <span className='flex flex-wrap justify-center gap-2 px-4'>
        {
          colors.map(color => {
            return (
              <ThemeColorButton
                onClick={() => setActiveColor(color)}
                key={color}
                classname='border border-[rgba(0,0,0,.4)]'
                item={color}
              />
            )
          })
        }
      </span>
    </div>
  )
}

export default ProductCard