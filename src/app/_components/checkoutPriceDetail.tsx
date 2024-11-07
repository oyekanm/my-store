import { Button } from '@/components/ui/button'
import React from 'react'


type Props = {
  addTotal: number,
  checkOut: () => void,
  submitting:boolean
}

export default function CheckoutPriceDetail({ addTotal,checkOut,submitting }: Props) {
  return (
    <div className='sm:sticky md:w-[400px]'>
      <div className=" w-full ">
        <div className="p-4 mb-4  w-full bg-base-100 rounded-none shadow-[0_0_10px_5px_#a5909057]">
          <div className="">
            <h2 className=" text-[2rem] font-medium">Summary</h2>
            <div className="grid gap-4 py-8">
              <span className="flex items-center justify-between text-[1.5rem] border-b py-4 ">
                Sub-total <span>NGN
                  {/* {total?.toFixed(2)} */}
                  {addTotal}
                </span>
              </span>
              <span className="flex items-center justify-between text-[1.5rem] border-b py-4">
                Delivery fee
                <span>
                  TBC
                  {/* NGN 500.62 */}
                </span>
              </span>
              <span className="flex items-center justify-between text-[1.5rem] font-medium py4">
                Total
                <span>NGN
                  {addTotal}
                </span>
              </span>
            </div>
            <Button onClick={checkOut} disabled={submitting} className="text-[1.8rem] w-full font-semibold capitalize rounded-[1rem] h-16">
              checkout
            </Button>

            {/* <Flutter onClose={clearCart} price={addTotal}/> */}
          </div>
        </div>
      </div>
      <div className="card w-full bg-base-100 p-4 rounded-none shadow-[0_0_10px_5px_#a5909057]">
        <div className="card-body">
          <div className="pb-4">
            <h2 className="card-title text-[2rem] font-bold">Pay with</h2>
            <div className="grid grid-cols-6 gap-3 pt-4">
              <img
                src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                alt="visa card"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9NkGQLcql_p8QCkbADD_UV0mw8FON3znFJ6lHd7FXw&s"
                alt="master card"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTsT9VojMYDl1a35sEilgC3W64KiQfj5cKBrEuobZD6w&s"
                alt="paypal"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2052px-American_Express_logo_%282018%29.svg.png"
                alt="american express"
              />
            </div>
          </div>
          <hr className="py-4" />
          <div>
            <h2 className="card-title text-[2rem] font-bold">
              Buyer protection
            </h2>
            <p className="text-[1.6rem] font-medium pt-4">
              Get full refund if the item is not as described or if is not
              delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
