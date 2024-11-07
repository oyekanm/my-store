"use client"

import { TableComponent } from '@/app/_components/preline'
import { FetchData } from '@/lib/fetchers/getDatas'
import { Loader2 } from 'lucide-react'
import { UserColumn } from './UserColumn';


const data = [
  {
    name: "John Doe",
    email: "john@example.com",
    lastOrder: "2023-01-01",
    paymentMethod: "Credit Card"
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    lastOrder: "2023-02-15",
    paymentMethod: "PayPal"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    lastOrder: "2023-03-20",
    paymentMethod: "Stripe"
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    lastOrder: "2023-04-10",
    paymentMethod: "Venmo"
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    lastOrder: "2023-05-05",
    paymentMethod: "Cash"
  },
  {
    name: "Sophia Wilson",
    email: "sophia@example.com",
    lastOrder: "2023-06-18",
    paymentMethod: "Bank Transfer"
  },
  {
    name: "Liam Garcia",
    email: "liam@example.com",
    lastOrder: "2023-07-22",
    paymentMethod: "Payoneer"
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    lastOrder: "2023-08-30",
    paymentMethod: "Apple Pay"
  },
  {
    name: "Noah Rodriguez",
    email: "noah@example.com",
    lastOrder: "2023-09-12",
    paymentMethod: "Google Pay"
  },
  {
    name: "Ava Lopez",
    email: "ava@example.com",
    lastOrder: "2023-10-25",
    paymentMethod: "Cryptocurrency"
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    lastOrder: "2023-11-05",
    paymentMethod: "Alipay"
  },
  {
    name: "Mia Gonzalez",
    email: "mia@example.com",
    lastOrder: "2023-12-08",
    paymentMethod: "WeChat Pay"
  },
  {
    name: "James Perez",
    email: "james@example.com",
    lastOrder: "2024-01-18",
    paymentMethod: "Square Cash"
  },
  {
    name: "Charlotte Carter",
    email: "charlotte@example.com",
    lastOrder: "2024-02-22",
    paymentMethod: "Zelle"
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    lastOrder: "2024-03-30",
    paymentMethod: "Stripe"
  }
];

export default function page() {
    // const { data, error, isLoading } = FetchData({url:'/api/products'}) 
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
                            column={UserColumn} data={data} headerText='Users' 
                             />
                    )
                }
                {
                    data?.length === 0  && <div className='flex items-center justify-center mt-12'>
                        <p className='text-[3rem] font-bold capitalize '>No product</p>
                    </div>
                }
            </section>
        </div>
    )
}

