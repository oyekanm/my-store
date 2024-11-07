import React, { useState } from 'react'
import Modal from '@/app/_components/preline/Modal'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { FormSubmitButton } from '@/app/_components/FormSubmitButton'
import { CreateCollection, CreateCollectionType, DeleteCollectionType, DeleteSingleCollection, UpdateCollection, UpdateCollectionType } from '@/actions/CollectionActions'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Toast from '@/app/_components/ui/toast'
import { useRecoilState } from 'recoil'
import { collectionInfo, collectionTypeInfo } from '@/app/_state/atom/ProductState'
import { FetchData } from '@/lib/fetchers/getDatas'
import Dropdown from '@/app/_components/ui/dropdown'

type Props = {
    collections: Collection[];
}

export default function CollectionTypeComponent({collections }: Props) {
    const { data: collectionTypes }: { data: CollectionType[] } = FetchData({ url: '/api/collectionType' })
    const [isEditing, setIsEditing] = useState(false)
    const [collType, setCollType] = useRecoilState(collectionTypeInfo)
    const [collectionType, setCollectionType] = useState("")
    const [collectionId, setCollectionId] = useState("")

    console.log(collectionTypes)




    const createCollectionType = async (FormData: FormData, collectionId: string) => {
        const response = await CreateCollectionType(FormData, collectionId)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            Toast({ title: "Operation success", description: `${response?.data?.name} created successfully!!` })
            setCollectionType("")
            setCollectionId("")
        }
    }
    const updateCollectionType = async (FormData: FormData, collectionId: string, id: string) => {
        const name = FormData.get("name") as string
        if (collType.name === name) {
            setCollectionType("")
            return;
        }

        const response = await UpdateCollectionType(FormData, collectionId, id)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            Toast({ title: "Operation success", description: `${response?.data?.name} updated successfully!!` })
            setCollectionType("")
            setCollectionId("")
            setIsEditing(false)
        }
    }
    const deleteCollectionType = async (id: string) => {
        const response = await DeleteCollectionType(id)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            Toast({ title: "Operation success", description: `${response?.data?.name} deleted successfully!!` })
        }
    }
    const mutateCollectionType = (FormData: FormData) => {
        if (isEditing) {
            updateCollectionType(FormData, collectionId, collType.id)
        } else {
            createCollectionType(FormData, collectionId)
        }
    }
    return (
        <section>
            <div className='flex items-center justify-between shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
                <div>
                    <p className='text-[2rem] color-primary capitalize '>add a collection type</p>
                    <div className='md:flex flex-col p-8 px-[3rem] gap-[3rem]'>

                        <div className=''>
                            <Dropdown
                                btnTitle='pick a collection'
                                emptyText='There are no collections at the moment'
                                data={collections}
                                setFunction={setCollectionId}
                                defaultValue={collectionId}
                            />
                        </div>
                        <form action={mutateCollectionType}>
                            <div className="flex flex-col items-center sm:flex-row gap-[4rem] mb-4 sm:w-[70%] " >
                                <input
                                    name='name'
                                    onChange={(e) => setCollectionType(e.target.value)} value={collectionType}
                                    className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                    type={"text"} placeholder={"create new collection type"} />
                                <FormSubmitButton text='Send' />
                            </div>
                        </form>
                    </div>
                </div>

                <Button
                    type='button'
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-task-created-alert" data-hs-overlay="#hs-task-created-alert"
                    disabled={collectionTypes!?.length === 0 ? true : false}
                    variant="ghost" className="h-8 w-8 p-0 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                </Button>
                <Modal>
                    <p className='text-[2rem] font-semibold'>Mutate the collection types you created</p>
             
                    <div className='overflow-auto h-[70vh]'>
                        {
                            collectionTypes?.map(coll => {
                                return <span className='flex items-center justify-between p-4' key={coll.id}>
                                    <p className='text-[1.8rem] font-medium '>{coll.name}</p>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 " size="icon">
                                                <span className="sr-only">Open menu</span>
                                                <ChevronDown size={16} color="#000" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[200px] p-4">

                                            {/* <DropdownMenuSeparator /> */}
                                            <DropdownMenuItem onClick={() => {
                                                setCollType({ id: coll.id, name: coll.name })
                                                setIsEditing(true)
                                                setCollectionType(coll.name)
                                                setCollectionId(coll?.collectionId ?? "")
                                                // console.log(coll.collectionId)
                                            }} >
                                                <Button
                                                    // disabled={collTypeDeleteLoading} 
                                                    variant="ghost">
                                                    <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='' onClick={() => {
                                                deleteCollectionType(coll.id)

                                            }}>
                                                <Button
                                                    // disabled={collTypeDeleteLoading} 
                                                    variant="ghost">
                                                    <span className="text-[1.5rem] p-2 font-medium capitalize">Delete </span>
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </span>
                            })
                        }
                    </div>
                </Modal>


            </div>
        </section>
    )
}
