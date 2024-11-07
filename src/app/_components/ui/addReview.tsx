"use client"

import { Form } from '@/components/ui/form';
import { reviewSchema } from '@/lib/schemas/reviewSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Rating from "@mui/material/Rating";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormSubmitButton } from '../FormSubmitButton';
import Toast from './toast';
import { createReview } from '@/actions/ReviewAction';

type Props = {
  id: string;

}

export default function AddReview({id}:Props) {
  const [starValue, setStarValue] = useState(0)

  // form initialization
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
      productId: id,
      userId: "clxs63hj10000ltix972685ug"
    },
  })

console.log(form.getValues())

  const handleSubmit = async(values: z.infer<typeof reviewSchema>) => { 
    const result = reviewSchema.safeParse(values)

    if (result.success) {

      const response = await createReview(result.data)


      // error handling
      // if (response?.error) {
      //     Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
      //     return;
      // }

      // data successfully recieved
      if (response?.data) {
          form.reset()
          Toast({ title: "Operation success", description: `Your review has been recieved`, className: "bg-green-500" })
      }
  }
  else {
      console.log(result.error)
  }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 md:w-[30%] pt-8' action="">
        <textarea onChange={e=>form.setValue('comment',e.target.value)} name="comment" id="comment" className='resize-none p-4 text-[1.4rem] font-medium border placeholder:text-[1.4rem]' placeholder='write a review' cols={30} rows={10}></textarea>
        <span className='flex gap-2 items-center text-[1.6rem] font-medium'>
          Rate:
          <Rating onChange={(event, newValue) => {
            // console.log(event, newValue)
            form.setValue("rating", newValue!)
            setStarValue(newValue!)
          }} size='large' name="half-rating" defaultValue={starValue? starValue: 0} precision={0.5} />
        </span>
        <FormSubmitButton  loading={form.formState.isSubmitting} text='Submit Review' />
      </form>
    </Form>
  )
}
