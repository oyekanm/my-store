import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import React from 'react'



export type CardProps = {
    label: string;
    icon: LucideIcon;
    amount: string;
    discription: string;
  };
  
  export default function DashboardOverviewCard(props: CardProps) {
    return (
      <Card>
        <CardContent>
        <section className="flex justify-between gap-2">
          {/* label */}
          <p className="text-sm">{props.label}</p>
          {/* icon */}
          <props.icon className="h-4 w-4 text-gray-400" />
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">{props.amount}</h2>
          <p className="text-xs text-gray-500">{props.discription}</p>
        </section>
      </CardContent>
      </Card>
    );
  }
