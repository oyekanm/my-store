import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


type Props = {
    files?: ImageUrl[];
}



export function ProductCarouselImage({ files }: Props) {

    // const autoplay = async()=>{
    //     "use server"
    //   Autoplay({
    //         delay: 2000,
    //     })
    // }

    return (
        <Carousel
            plugins={[
            //    autoplay()
            ]}
            // opts={{
            //     align: "start",
            // }}
            className="w-full "
        >
            <CarouselContent>
                {files?.map((file, index) => (
                    <CarouselItem key={index} className="md:basis-full h-[90vh]">
                        {/* <Image alt={file.id} src={file.url} width={100} height={100} className="w-full h-full"/> */}
                        <img alt={file.id} src={file.url} width={100} height={100} className="w-full h-full" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='left-1' />
            <CarouselNext className='right-1'/>
        </Carousel>
    )
}



