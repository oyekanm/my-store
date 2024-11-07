
import Chart from '@/app/_components/charts'
import DashboardOverviewCard from '@/app/_components/dashboardOverviewCard';
import HeaderCard from '@/app/_components/headerCard';
import SalesCard from '@/app/_components/salesCard';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import React from 'react'

async function page() {

  // const user = {
  //     id: session?.id,
  //     name: session?.firstName,
  //     image: session?.imageUrl,
  //     email: session?.emailAddresses[0]?.emailAddress
  // }

  // const id = user.id

  // // console.log(user?.id);

  // if (!user || !user.id) redirect('/sign-in?origin=dashboard')

  // if (user.email !== "enitanboluwatife5@gmail.com") redirect('/')

  // const dbUser = await db.user.findFirst({
  //     where: { id }
  // })

  // console.log("dash", dbUser)

  // // if (!dbUser) redirect('/auth-callback?origin=dashboard')
  // if (!dbUser) {
  //     api.auth.authCallback.query()
  // }

  const cardData = [
    {
      label: "Total Revenue",
      amount: "$45,231.89",
      discription: "+20.1% from last month",
      icon: DollarSign
    },
    {
      label: "Subscriptions",
      amount: "+2350",
      discription: "+180.1% from last month",
      icon: Users
    },
    {
      label: "Sales",
      amount: "+12,234",
      discription: "+19% from last month",
      icon: CreditCard
    },
    {
      label: "Active Now",
      amount: "+573",
      discription: "+201 since last hour",
      icon: Activity
    }
  ];

  const userSalesData = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      saleAmount: "+$1,999.00"
    },
    {
      name: "Jackson Lee",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$1,999.00"
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      saleAmount: "+$39.00"
    },
    {
      name: "William Kim",
      email: "will@email.com",
      saleAmount: "+$299.00"
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      saleAmount: "+$39.00"
    }
  ];

  return (
    <div className='p-4'>
      <HeaderCard text='Dashboard' />

      <section className="grid pt-8 w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <DashboardOverviewCard
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 pt-12 gap-4 transition-all lg:grid-cols-2">
        <Card>
          <p className="p-4 font-semibold">Overview</p>

          <Chart />
        </Card>
        <Card className="flex flex-col justify-between gap-4 p-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>
          {userSalesData.map((d, i) => (
            <SalesCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </Card>

        {/*  */}
      </section>

    </div>
  )
}

export default page