import { CreateCollection, DeleteSingleCollection, UpdateCollection } from '@/actions/CollectionActions'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'


import Toast from '@/app/_components/ui/toast'
import { collectionInfo } from '@/app/_state/atom/ProductState'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRecoilState } from 'recoil'
import { FormSubmitButton } from '@/components/form'
import Modal from '@/components/Modal'

type Props = {
    collections: Collection[];
}

export default function CollectionComponent({ collections }: Props) {
    const [collection, setCollection] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [coll, setColl] = useRecoilState(collectionInfo)




    const deleteCollection = async (id: string) => {
        const response = await DeleteSingleCollection(id)

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
    const mutateCollection = async (FormData: FormData) => {
        if (isEditing) {
            updateCollection(FormData, coll.id)
        } else {
            createCollection(FormData)
        }
    }

    const createCollection = async (FormData: FormData) => {
        const response = await CreateCollection(FormData)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            setCollection("")
            Toast({ title: "Operation success", description: `${response?.data?.name} created successfully!!` })
        }
    }
    const updateCollection = async (FormData: FormData, id: string) => {
        const name = FormData.get("name") as string
        if (coll.name === name) {
            setCollection("")
            return;
        }
        const response = await UpdateCollection(FormData, id)

        // error handling
        if (response?.error) {
            Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (response?.data) {
            setCollection("")
            setIsEditing(false)
            Toast({ title: "Operation success", description: `${response?.data?.name} updated successfully!!` })
            // setColl({id:"", name:""})
        }
    }

   

    return (
        <section>
            <div className='flex items-center justify-between shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem] mt-[3rem] p-4 px-8'>
                <div>
                    <p className='text-[2rem] color-primary capitalize '>add new colection</p>
                    <div className='md:flex p-8 px-[3rem] gap-[3rem]'>
                        <form action={mutateCollection}>
                            <div className="flex flex-col items-center sm:flex-row gap-[5rem] mb-4" >
                                <input
                                    onChange={(e) => setCollection(e.target.value)}
                                    name='name' value={collection}
                                    className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                    type={"text"} placeholder={"create new collection"} />
                                <FormSubmitButton text='Send' />
                            </div>
                        </form>
                    </div>
                </div>

                <Button
                    type='button'
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-task-created-alert" data-hs-overlay="#hs-task-created-alert"
                    disabled={collections!?.length === 0}
                    variant="ghost" className="h-8 w-8 p-0 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                </Button>
                <Modal>
                    <p className='text-[2rem] font-semibold'>Mutate the collection you created</p>

                    <div className='overflow-auto h-[70vh]'> 
                        {
                            collections?.map(coll => {
                                return <span className='flex items-center justify-between p-4' key={coll.id}>
                                    <p className='text-[1.8rem] font-medium '>{coll.name}</p>

                                    <DropdownMenu >
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 " size="icon">
                                                <span className="sr-only">Open menu</span>
                                                <ChevronDown size={16} color="#000" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[200px] relative bg-gray-900 p-4">

                                            {/* <DropdownMenuSeparator /> */}
                                            <DropdownMenuItem onClick={() => {
                                                setColl({ id: coll.id, name: coll.name })
                                                setIsEditing(true)
                                                setCollection(coll.name)
                                            }} >
                                                <Button
                                                    // disabled={collectionDeleteLoading} 
                                                    variant="ghost" >
                                                    <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {
                                                deleteCollection(coll.id)
                                            }}>
                                                <Button
                                                    //  disabled={collectionDeleteLoading} 
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
