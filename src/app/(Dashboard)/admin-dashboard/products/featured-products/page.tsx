"use client"



import { Modal, ModalTrigger, TableComponent } from '@/components';
import { OrderColumn } from '../../orders/OrderColumn';


const data = [
  {
    total_price: 1000,
    id: "ORD001",
    status: "Pending",
    createdAt: new Date(),
    payment_method: "Credit Card"
  },
  {
    total_price: 1000,
    id: "ORD002",
    status: "Processing",
    createdAt: new Date(),
    payment_method: "PayPal"
  },
  {
    total_price: 1000,
    id: "ORD003",
    status: "Completed",
    createdAt: new Date(),
    payment_method: "Stripe"
  },
  {
    total_price: 1000,
    id: "ORD004",
    status: "Pending",
    createdAt: new Date(),
    payment_method: "Venmo"
  },
  {
    total_price: 1000,
    id: "ORD005",
    status: "Completed",
    createdAt: new Date(),
    payment_method: "Bank Transfer"
  },
  {
    total_price: 1000,
    id: "ORD006",
    status: "Processing",
    createdAt: new Date(),
    payment_method: "Apple Pay"
  },
  {
    total_price: 1000,
    id: "ORD007",
    status: "Completed",
    createdAt: new Date(),
    payment_method: "Google Pay"
  },
  {
    total_price: 1000,
    id: "ORD008",
    status: "Pending",
    createdAt: new Date(),
    payment_method: "Cryptocurrency"
  },
  {
    total_price: 1000,
    id: "ORD009",
    status: "Processing",
    createdAt: new Date(),
    payment_method: "Alipay"
  }
];

export default function page() {
  // const { data, error, isLoading } = FetchData({url:'/api/products'}) 
  // console.log(OrderColumn)
  return (
    <div>
      <section>
        {/* {isLoading && <div className='flex items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>} */}
        {
          data?.length > 0 && (
            <TableComponent
              check={false}
              column={OrderColumn} data={data} headerText='Featured Products'
            >
              <ModalTrigger clx='text-[1.4rem] font-medium h-12 bg-blue-600 hover:bg-blue-700' >Add a Product</ModalTrigger>
            </TableComponent>
          )
        }
        {
          data?.length === 0 && <div className='flex items-center justify-center mt-12'>
            <p className='text-[3rem] font-bold capitalize '>No product</p>
          </div>
        }
        <Modal>hello</Modal>
      </section>
    </div>
  )
}

