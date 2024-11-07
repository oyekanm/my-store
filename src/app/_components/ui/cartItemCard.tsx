"use client"

import React, { useEffect, useState } from 'react'
import { ChevronDown, Heart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cartSchema } from '@/lib/schemas/orderSchema'
import { deleteCartItem, updateQuantity } from '@/actions/OrderActions'
import { KeyedMutator } from 'swr'

type Props = {
    cart: Cart,
    cartData: Cart[],
    mutate: KeyedMutator<any>
}

export default function CartItemCard({ cart, mutate, cartData }: Props) {
    const { id, color, quantity, size, userId, product, productId } = cart
    const {
        image,
        price,
        title,
    } = product;
    const [count, setCount] = useState(0)

    // console.log([...current.slice(0, updatedIndex),
    //      { ...current[updatedIndex], ...{id:"ste"}  }, 
    //      ...current.slice(2)])

    useEffect(() => {

        setCount(quantity)
    }, [cart, count])

    const subtr = async () => {
        const data = {
            userId,
            color,
            size,
            productId,
            quantity: count - 1
        }
        setCount(prev => prev - 1)
        const result = cartSchema.safeParse(data)

        if (result.success) {
            console.log(result.data.quantity)
            // mutate function on the server with an optimistic update on ui
            await mutate(
                updateQuantity(result.data, id),
                {
                    optimisticData: (current: Cart[]) => {
                        const updatedIndex = current.findIndex((item) => {
                            return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                        })
                        if (updatedIndex !== -1) {
                            if(count - 1 > 0){
                                // Update the item in the array
                                return [
                                    ...current.slice(0, updatedIndex),
                                    { ...current[updatedIndex],quantity: count - 1  },
                                    ...current.slice(updatedIndex + 1),
                                ];
                            }else{
                                return current.filter(item=> item.id !== current[updatedIndex].id)
                            }
                        }

                        // Item not found, handle as needed 
                        return current;
                    },
                    // optimisticData: cartData.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
                    rollbackOnError: true,
                    populateCache: ((result: Cart, currentData: Cart[]) => {
                        // console.log(result, currentData, "populate")
                        const updatedIndex = currentData.findIndex((item) => {
                            return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                        })
                        if (updatedIndex !== -1) {
                            if(count - 1 > 0){
                                // Update the item in the array
                                return [
                                    ...currentData.slice(0, updatedIndex),
                                    { ...currentData[updatedIndex],quantity: count - 1  },
                                    ...currentData.slice(updatedIndex + 1),
                                ];
                            }else{
                                return currentData.filter(item=> item.id !== currentData[updatedIndex].id)
                            }
                        }

                        // Item not found, handle as needed 
                        return currentData;

                    }),
                    // populateCache:true,
                    revalidate: false,
                });
        }
    }
    const add = async () => {
        setCount(prev => prev + 1)
        const data = {
            userId,
            color,
            size,
            productId,
            quantity: count + 1
        }

        const result = cartSchema.safeParse(data)
        if (result.success) {
            // mutate function on the server with an optimistic update on ui
            await mutate(
                updateQuantity(result.data, id),
                {
                    optimisticData: (current: Cart[]) => {
                        const updatedIndex = current.findIndex((item) => {
                            return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                        })
                        if (updatedIndex !== -1) {
                            // Update the item in the array
                            return [
                                ...current.slice(0, updatedIndex),
                                { ...current[updatedIndex],quantity: count + 1 },
                                ...current.slice(updatedIndex + 1),
                            ];
                        }

                        // Item not found, handle as needed 
                        return current;
                    },
                    // optimisticData: cartData.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
                    rollbackOnError: true,
                    populateCache: ((result: Cart, currentData: Cart[]) => {
                        // console.log(result, currentData, "populate")
                        const updatedIndex = currentData.findIndex((item) => {
                            return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                        })
                        if (updatedIndex !== -1) {
                            // Update the item in the array
                            return [
                                ...currentData.slice(0, updatedIndex),
                                { ...currentData[updatedIndex],quantity: count + 1 },
                                ...currentData.slice(updatedIndex + 1),
                            ];
                        }

                        // Item not found, handle as needed 
                        return currentData;

                    }),
                    // populateCache:true,
                    revalidate: false,
                });
        }
    }
    const deleteCart = async () => {
        // mutate function on the server with an optimistic update on ui
        await mutate(
            deleteCartItem(id)   ,
            {
                optimisticData: (current: Cart[]) => {
                    const updatedIndex = current.findIndex((item) => {
                        return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                    })
                    if (updatedIndex !== -1) {
                        return current.filter(item=> item.id !== current[updatedIndex].id)
                    }

                    // Item not found, handle as needed 
                    return current;
                },
                // optimisticData: cartData.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
                rollbackOnError: true,
                populateCache: ((result: Cart, currentData: Cart[]) => {
                    // console.log(result, currentData, "populate")
                    const updatedIndex = currentData.findIndex((item) => {
                        return item.id === id && item.userId === userId && item.productId === productId && item.size === size && item.color === color;
                    })
                    if (updatedIndex !== -1) {
                        return currentData.filter(item=> item.id !== currentData[updatedIndex].id)
                    }

                    // Item not found, handle as needed 
                    return currentData;

                }),
                // populateCache:true,
                revalidate: false,
            });
    }

    const img = image.filter(i => i.color === color)
    return (
        <div
            className="grid grid-cols-[100px_1fr] gap-4 p-4 "
        >
            <Image priority src={img[0].file[0].url} alt={title} width={100} height={100} className="h-[100px]" />
            <div className='flex flex-col'>
                <div>
                    <span className="flex sm:flex-row items-center justify-between">
                        <span>
                            <p className="text-[2rem] hidden  sm:block">
                                {title.substring(0, 55)}
                                {title?.length > 55 && "..."}
                            </p>
                            <p className="text-[2rem] block  sm:hidden">
                                {title}
                            </p>
                        </span>
                        <span className="flex items-center gap-4">
                            <span
                                // onClick={() => addToFave(id)}
                                className=" right-3 cursor-pointer top-0"
                            >
                                {/* {favorite.includes(id) ? (
                                  <AiFillHeart
                                    color="red"
                                    className="w-12 h-12"
                                  />
                                ) : (
                                )}
                              */}
                                <Heart className="w-8 h-8" />
                            </span>
                            <Trash2
                                onClick={deleteCart}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </span>
                    </span>
                    <span className="flex items-center justify-between  ">
                        <p className="text-[1.6rem] font-medium">
                            NGN{price}
                        </p>
                        <p className="text-[1.4rem]">
                            {color}
                        </p>
                    </span>
                </div>
                <div className="flex gap-8 items-center justify-between mt-auto">
                    <span className='flex  underline items-center'>
                        <p className='text-[1.4rem] uppercase'>{size}</p>
                        <span>
                            <ChevronDown className="w-6 h-6 " />
                        </span>
                    </span>
                    <div className='flex items-center gap-2'>
                        <Button
                            // disabled={count === 0}
                            variant={"outline"}
                            className="h-8 rounded-full"
                            onClick={() => subtr()}
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <p className="text-[1.5rem]">{count}</p>
                        <Button
                            onClick={() => add()}
                            variant={"outline"}
                            className="h-8 rounded-full"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
