  export const OrderColumn: column[] = [
    {
      key: "id",
      label: "Order",
    },
    {
      key: "status",
      label: "Status",
      render(value) {
        return <span className={`text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200 inline lowercase status ${value.toLowerCase()}`}>{value}</span>
      },
    },
    {
      key: "total_price",
      label: "Total Price",
      render(value) {
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(value)

          return (
            <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
            >{formatted}
            </span>
          )
          
      },
    },
    {
      key: "createdAt",
      label: "Order Time",
      render(value: any) {
        const formatted = formatDate(value)
  
        return (
          <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
          >{formatted}
          </span>
        )
      }
    },
    {
      key: "payment_method",
      label: "Payment Method",
     
    },
  ]

  function formatDate(date:any) {
    // console.log(new Date())
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    }).format(date);
  }