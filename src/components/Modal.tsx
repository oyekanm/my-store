import { Button } from '@/components/ui/button';
import React from 'react';

type Props = {
    children?: React.ReactNode
}

export default function Modal({ children }: Props) {
    return (
        <div id="hs-task-created-alert" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto" role="dialog" aria-labelledby="hs-task-created-alert-label">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-[60rem] sm:w-full m-3 sm:mx-auto">
                <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">
                    <div className="absolute top-2 end-2">
                        <Button type="button"
                            className="size-10 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                            aria-label="Close" data-hs-overlay="#hs-task-created-alert">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </Button>
                    </div>

                    <div className="p-4 sm:p-10">
                        {children}

                        <div className="mt-6 flex justify-center gap-x-4">
                            <Button type="button"
                                className="py-2 px-8 inline-flex items-center gap-x-2 text-[1.2rem] font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                data-hs-overlay="#hs-task-created-alert">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
type TriggerProps = {
    text?: string, disabled?: any, children?: React.ReactNode,
    variant?: "ghost" | "destructive" | "link" | "outline",
    clx?:string
}

export const ModalTrigger = ({ disabled, text, children,variant, clx }:TriggerProps) => {
    return (
        <Button
            type='button'
            aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-task-created-alert" data-hs-overlay="#hs-task-created-alert"
            disabled={disabled}
            variant={variant} className={clx}>
            {children}
        </Button>
    )
}
