"use client"

import { RefundTransactions, SuccessfulTransactions } from "@/features/transactions/components"
import { cn } from "@/lib"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function page() {
  const path = useSearchParams().get("type")

  const linkText = ""
  const unActive = "text-sky-500 hover:text-sky-700 border-transparent"
  const active = "border-gray-300 border-b-transparent text-[1.5rem] font-semi-bold text-gray-500 hover:text-gray-700"

  console.log(path)
  return (
    <div>
        <div className="border-b mb-8 border-gray-200">
          <nav className="-mb-px flex items-center justify-center gap-6">
            <Links text="Successful Payments" url="?" cls={`${linkText} ${!path ? active : unActive}`} />
            <Links text="Refunds" url="?type=refunds" cls={`${linkText} ${path === "refunds" ? active : unActive}`} />
          </nav>
        </div>
        <div>
          {!path && <SuccessfulTransactions />}
          {path === "refunds" && <RefundTransactions />}
        </div>
    </div>
  )
}

export default page

const Links = ({ text, url, cls, children }: { url: string, text: string, cls?: string, children?: React.ReactNode }) => {
  return (
      <Link
        className={cn(
          "shrink-0 border rounded-t-lg p-4 text-[1.3rem] sm:px-8 font-medium",
          cls
        )}
        href={`${url}`}>
        {children}
        {text}
      </Link>
  )
}