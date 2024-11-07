"use client"

import { Button } from '@/components/ui/button';
import Rating from "@mui/material/Rating";
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { products, size } from '../../../app/(Home Routes)/collections/cc';
import ThemeColorButton from '../../../app/_components/themeColorButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import Toast from '../../../app/_components/ui/toast';
import { createCartItem } from '@/actions/OrderActions';
import { cartSchema } from '@/lib/schemas/orderSchema';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { FormSubmitButton } from './FormSubmitButton';
import { mutate } from 'swr';

type Props = {
    data: Product;
    setColor: (color: string) => void;
    activeClr: string
}

export default function ProductDetails({ data, setColor, activeClr }: Props) {

    const { title, price, description, rating, image } = data || {}
    // form initialization
    const form = useForm<z.infer<typeof cartSchema>>({
        resolver: zodResolver(cartSchema),
    })
    const route = useRouter()
    const [count, setCount] = useState(0)
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    });
    const colors = image?.map(img => img.color)

    // console.log(form.getValues())

    const addToCart = async (values: CartItem) => {
        const result = cartSchema.safeParse(values)

        // console.log(result)
        if (result.success) {
            setCount(0)
            const response = await mutate(
                "/api/cart",
                createCartItem(result.data),
                {
                    optimisticData: (current: any,) => {
                        // Update the item in the array
                        console.log(current)

                        return [
                            ...current,
                            result.data
                        ];
                    },
                    populateCache: true,
                    rollbackOnError: true,
                    revalidate: false,
                });
            // const response = await createCartItem(result.data)


            // error handling
            // if (response?.error) {
            //     Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            //     return;
            // }

            // data successfully recieved
            if (response?.data) {
                const { color, size } = response?.data
                form.reset()
                Toast({ title: "Operation success", description: `This item has been added to cart with color:${color} and size:${size}`, className: "bg-green-500" })
            }
        }
        else {
            console.log(result.error)
        }
    };

    useEffect(() => {
        setForm()
    }, [count])

    const setForm = () => {
        form.setValue("userId", "clxs63hj10000ltix972685ug")
        form.setValue("productId", data.id)
        // console.log(activeClr)
        if (activeClr) {
            form.setValue("color", activeClr)
            console.log(activeClr)
        }
    }

    const selectColor = (color: string) => {
        form.setValue("color", color)
        setColor(color)
    }

    const subtr = () => {
        form.setValue("quantity", count - 1)
        setCount(prev => prev - 1)
    }
    const add = () => {
        form.setValue("quantity", count + 1)
        setCount(prev => prev + 1)
    }

    return (
        <div className='md:pr-[10rem]'>
            <div className='flex items-center justify-between'>
                <p className='text-[3rem] font-bold capitalize'>{title}</p>
                <p className='text-[2rem] font-bold '>{USDollar.format(price)}</p>
            </div>
            <div className='flex items-center gap-8'>
                <span className='flex gap-2 items-center'>
                    {/* {
                        stars.map((i) => <Star key={i} className='w-6 h-6' />)
                    } */}
                    <Rating name="half-rating" defaultValue={rating} precision={0.5} />
                </span>
                <p className='text-[1.2rem]'>10 reviews</p>
            </div>
            {/* color */}
            <div className='py-[2rem]'>
                <p className='props-title' >color</p>
                <span className='flex flex-wrap justify-start gap-2 pt-4'>
                    {
                        colors?.map(color => {
                            return (
                                <ThemeColorButton
                                    onClick={() => selectColor(color)} key={color}
                                    classname={`${form.getValues("color") === color ? "shadow-[0px_0px_10px_5px_rgba(0, 0,0, 0.9)]" : ""} w-8 h-8 border border-[rgba(0,0,0,.4)] rounded-full `}
                                    item={color} />
                            )
                        })
                    }
                </span>
            </div>
            {/* size */}
            <div className='py-[2rem]'>
                <p className='props-title' >size</p>
                <span className='flex flex-wrap justify-start gap-2 pt-4'>
                    {
                        size.map(size => {
                            return (
                                <Button key={size} variant={'outline'}
                                    className='rounded-full border-[2px] p-2 w-[40px] h-[40px] uppercase text-[1.2rem] font-bold'
                                    onClick={() => form.setValue("size", size)}
                                >
                                    {size}
                                </Button>
                            )
                        })
                    }
                </span>
            </div>
            {/* quantity */}
            <div className='py-[2rem]'>
                <p className='props-title' >quantity</p>
                <div className='flex gap-4 items-center pt-8'>
                    <Button
                        disabled={count === 0}
                        variant={'outline'} className='h-16'
                        onClick={subtr}>
                        <Minus />
                    </Button>
                    <p className='text-[2rem]'>{count}</p>
                    <Button onClick={add}
                        variant={'outline'} className='h-16'>
                        <Plus />
                    </Button>
                </div>
            </div>
            <div className="py-[2rem]">
                <p className="props-title">description</p>
                <span className="text-[1.6rem] font-semibold flex flex-wrap justify-start gap-2 pt-4">
                    {description}
                </span>
            </div>
            <div className='flex flex-col gap-4 pt-8'>
                <Button variant={'ghost'} onClick={() => route.push("/cart")} className='text-[1.6rem] uppercase h-16 '>
                    checkout
                </Button>
                <Button disabled={form.formState.isSubmitting} onClick={form.handleSubmit(addToCart)} className='text-[1.6rem] uppercase h-16 '>add to cart</Button>
            </div>
        </div>
    )
}
