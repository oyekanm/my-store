"use client"

import { sizesSchema } from '@/lib/schemas/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { FormSubmitButton } from '@/components/form'
import { sizeInputs } from '@/components/form/formInputs'
import { createSize, deleteSize, updateSize } from '@/actions/SizeActions'

type Props = {
    editing?: boolean
}

export default function SizeForm({ editing }: Props) {
    const form = useForm<z.infer<typeof sizesSchema>>({
        resolver: zodResolver(sizesSchema),
        defaultValues: {
            name: "",
            description: "",
            order: 0,
        },
    })

    useEffect(() => {
        if (editing) {
            form.setValue("id", 5)
        }
    }, [])

    const mutateSize = async (formdata: z.infer<typeof sizesSchema>) => {
        const result = sizesSchema.safeParse(formdata)
        // console.log(result)

        if (result.success) {
            if (editing) {
                const response = await updateSize(result.data)
                console.log(result)
                // console.log(response)

                // error handling
                // if (response?.error) {
                //     // Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
                //     return;
                // }

                // data successfully recieved
                if (response?.data) {
                    form.reset()
                    // Toast({ title: "Operation success", description: `${response.data.name} created successfully!!`, className: "bg-green-500" })
                }
            } else {
                const response = await createSize(result.data)
                // console.log(result)
                // error handling
                // if (response?.error) {
                //     console.log(response?.error)
                //     // Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
                //     return;
                // } 
                console.log(response?.error)

                // data successfully recieved
                if (response?.data) {
                    form.reset()
                    // Toast({ title: "Operation success", description: `${response.data.name} created successfully!!`, className: "bg-green-500" })
                }
            }
        } else {
            console.log(result.error)
        }
    }




    const labelClass = "font-semibold text-[2rem] text-slate-700 block mb-2 dark:text-white"
    const inputClass = "!py-8 px-4 rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"

    // console.log(form.getValues(), editing)
    return (
        <Form {...form} >
            <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
                <form
                    onSubmit={form.handleSubmit(mutateSize)}
                    className="space-y-8 lg:w-[70%]">
                    {
                        sizeInputs.map(size => {
                            return (
                                <FormField
                                    key={size.id}
                                    // control={form.control}
                                    name={size.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={labelClass} >{size.label}</FormLabel>
                                            <FormControl>
                                                <Input type={size.type} placeholder={size.placeholder} {...field} className={inputClass} />
                                            </FormControl>
                                            <FormMessage className='text-[1.4rem]' />
                                        </FormItem>
                                    )}
                                />)

                        })
                    }

                    <FormSubmitButton
                        // loading={false}
                        className='w-full'
                        loading={form.formState.isSubmitting}
                        text={editing ? "Update Size" : "Submit"} />
                </form>
            </div>
        </Form>
    )
}
