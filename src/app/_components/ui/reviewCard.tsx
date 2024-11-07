"use client"

import React from 'react'
import Rating from "@mui/material/Rating";

type Props = {
    name: string;
    img: string;
    text: string;
    time: string;
    rating: number
}

export default function ReviewCard({ img, name, rating, text, time }: Props) {
    return (
        <div className='bg-white shadow-[0px_0px_20px_rgba(0,0,0,.2)] p-4'>
            <span className='flex gap-4 items-center'>
                <img src="https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format"
                    alt="user profile img" className='rounded-full w-[30px] h-[30px] ' />
                <p className='text-[14px] font-medium capitalize'>hello me</p>
            </span>
            <span className='py-4 block'>
                <p className='text-[1.2rem] font-normal '>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, beatae dignissimos iusto possimus exercitationem velit ut perferendis illo quae odio atque reprehenderit minima maxime? Illum libero quos perspiciatis suscipit maxime.</p>
            </span>
            <span className='flex justify-between items-center' >
                <Rating onChange={(event, newValue) => {
                    console.log(event, newValue)
                }} size='large' name="half-rating" defaultValue={4.2} precision={0.5} />
                <p>time</p>
            </span>
        </div>
    )
}
