import "@/app/globals.css";
import { BreadCrumbs, } from "@/components";
import { DashboardHeader, DashboardMainContent, SideBar } from "@/features/dashboard/components";
import { RecoilLayout } from "@/layout";
import PrelineScript from "@/lib/PrelineScript";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <RecoilLayout>
        <body className={`font-sans`}>
          <DashboardHeader />
          <BreadCrumbs />
          <SideBar />
          <DashboardMainContent>
            {children}
          </DashboardMainContent>
          <PrelineScript />
        </body>
      </RecoilLayout>
    </html>
  )
}