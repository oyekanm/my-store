"use client"

import "@/app/globals.css";
import { PrelineScript } from "@/lib";
import { RecoilLayout,HomeLayout } from "@/layout";


export const DefaultImage = "https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format"





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(cookies().toString());

  return (
    <html lang="en">
      <RecoilLayout>
        <body className={`font-sans`}>
          <HomeLayout>
            {children}
          </HomeLayout>
          <PrelineScript />
        </body>
      </ RecoilLayout>
    </html>
  );
}
