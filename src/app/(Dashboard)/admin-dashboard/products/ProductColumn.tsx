"use client"

import { DeleteSingleProduct } from "@/actions/ProductActions"
import { DeleteImage } from "@/actions/ImageActions"


interface column {
  key: string;
  label: string;
  render?: (value: any) => JSX.Element;
  accessor?: string;
  class?: string
}

export const ProductColumn: column[] = [
  {
    key: "title",
    label: "Name",
  },
  {
    key: "CollectionType",
    label: "Collection-Type",
    accessor: "name"
  },
  {
    key: "uploadStatus",
    label: "Status",
    render(value) {
      return <span className={`text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200 inline lowercase status ${value.toLowerCase()}`}>{value}</span>
    },
  },
  {
    key: "price",
    label: "Price",
    render(value: any) {
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
]
