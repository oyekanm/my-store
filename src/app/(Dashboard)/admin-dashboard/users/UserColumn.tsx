  export const UserColumn: column[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "lastOrder",
      label: "LastOrder",
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
    },
  ]

  function formatDate(date:any) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }