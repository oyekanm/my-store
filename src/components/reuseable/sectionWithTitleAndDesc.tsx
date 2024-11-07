import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    title: string;
    desc?: string;
    children: React.ReactNode;
    className?: string;
    linkText?:string;
    link?:string
}

export default function SectionWithTitleAndDesc({ desc, title, children, className,link,linkText }: Props) {
    return (
        <section className={cn(['Container my-12', className])}>
            <div className="">
                <header>
                    <span className='flex items-center justify-between '>
                        <p className="text-[2rem] font-bold text-gray-900 sm:text-[3rem] uppercase">{title}</p>
                       {linkText && <a href={link} className="text-[1.6rem] font-semibold underline">{linkText}</a>}
                    </span>

                    {desc && (
                        <p className="font-medium max-w-md text-gray-500 text-[1.7rem]">
                            {desc}
                        </p>
                    )}
                </header>
                <div>
                    {children}
                </div>
            </div>
        </section>
    )
}
