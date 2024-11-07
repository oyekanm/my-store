"use client"

import { createOrder, createOrderedItem, deleteAllCartItem } from '@/actions/OrderActions';
import CheckoutPriceDetail from '@/app/_components/checkoutPriceDetail';
import CartItemCard from '@/app/_components/ui/cartItemCard';
import Toast from '@/app/_components/ui/toast';
import { Button } from '@/components/ui/button';
import { FetchData } from '@/lib/fetchers/getDatas';
import { orderSchema, orderedItemSchema } from '@/lib/schemas/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { z } from 'zod';




export default function page() {
  const { data, isLoading,mutate }: { data: Cart[], isLoading: boolean;mutate:KeyedMutator<any>} = 
  FetchData({url:`/api/cart?userId=${"clxs63hj10000ltix972685ug"}`, refresh:1000})
  const [addTotal, setAddTotal] = useState(0)
  // form initialization
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      userId: "clxs63hj10000ltix972685ug",
      address: "yaba, lagos",
      payment_method: "cash",
    }
  })


// clear cart function
  const clearCart = async () => {
    const ids = data?.map(cart => cart.id)
    await mutate(
      deleteAllCartItem(ids, "clxs63hj10000ltix972685ug"),
      {
          optimisticData: (current: Cart[]) =>([]),
          // optimisticData: cartData.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
          rollbackOnError: true,
          populateCache: ((result: Cart, currentData: Cart[]) => []),
          // populateCache:true,
          revalidate: false,
      });
  };

  // reduce function to get total cost of cart items
  const AddTotal = () => {
    // const tt = total + 500.62
    // setAddTotal(tt?.toFixed(2))
    if(data?.length === 0) return;
    const total = data?.reduce(
      (total, cart) => {
        const { quantity, product } = cart;
        const {
          price
        } = product;
        const priceSum = price * quantity;

        total.totalPrice += priceSum;

        return total;
      },
      {
        totalPrice: 0,
      }
    );
    const newTotal = Number(total?.totalPrice?.toFixed(2))
    setAddTotal(newTotal)
    form.setValue('total_price', newTotal)
  }
  useEffect(() => {
    AddTotal()
  }, [data])


  // order a product 
  const orderProduct = async (values: Order) => {
    const result = orderSchema.safeParse(values)

    // console.log(result)
    if (result.success) {
      const response = await createOrder(result.data)

      // data successfully recieved
      if (response?.data) {
        form.reset()
        data.map(async (cart) => {
          const {  color, quantity, size,  productId } = cart
          const ordered: OrderedItem = {
            color,
            orderId: response.data.id,
            productId,
            quantity,
            size,
          }
          const schema = orderedItemSchema.safeParse(ordered)
          if (schema.success) {
             await createOrderedItem(schema.data)
          }
        })
        clearCart()
        Toast({ title: "Operation success", description: `You have created an order`, className: "bg-green-500" })
      }
    }
    else {
      console.log(result.error)
    }
  };

  return (
    <div className='Container pb-16'>
      {/* {error && <Toast title={error?.message} />} */}
      {isLoading && (
        <div className="text-center">
          <p className='text-lg'>Loading</p>
        </div>
      )}
      {data?.length === 0 && (
        <div className="text-center">
          <p className="text-[2rem] sm:text-[4rem] font-bold ">
            OOPs!! You do not have any item in your Cart!
          </p>
          <Link href={"/"} className="underline text-[2rem] font-medium">
            {" "}
            Go back to select an item
          </Link>
        </div>
      )}
      {data?.length > 0 && (
        <section className="pt-12 pb-24 justify-between flex flex-col md:flex-row  gap-8">
          <div className=" flex flex-col flex-[4] gap-8 ">
            <div className="p-4 mb-4 w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className=" flex items-center justify-between flex-row">
                <h2 className="card-title text-[2rem] font-bold">
                  Shopping Cart ({data?.length})
                </h2>
                <Button
                  className={
                    "bg-transparent underline text-red-600 text-[1.5rem] font-medium border-none outline-none hover:bg-transparent shadow-none"
                  }
                  onClick={clearCart}
                >
                  Delete all item
                </Button>
              </div>
            </div>
            <div className=" w-full rounded-none shadow-[0_0_10px_5px_#a5909057]">
              <div className="grid gap-4 pb-4 ">
                {data
                  ?.map((cart, i) => {


                    // console.log(amount)
                    return (
                      <div className={` ${data?.length - 1 !== i && "border-b"}`} key={cart.id}>
                        <CartItemCard cartData={data} mutate={mutate} cart={cart} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <CheckoutPriceDetail submitting={form.formState.isSubmitting} checkOut={form.handleSubmit(orderProduct)} addTotal={addTotal} />
        </section>
      )
      }
    </div >
  )
}
