"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { imageInputs, productInputs, } from '@/components/form/formInputs'
import { useProductManagement } from '../hooks/useProductManagement';
import { Dropdown } from '@/components/ui';
import { FormSubmitButton } from '@/components/form';
import { useProductImageManagement } from '../hooks/useProductImageManagement';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Upload } from 'lucide-react';
import { useProductStore } from '../store/hooks';
import { CreateProductCarouselImage } from './createProductCarouselImage';
import UploadProductImage from './uploadProductImage';
import { useFetchData } from '@/hooks';
import { RichTextEditor } from '@/components';
import Modal from '@/components/Modal';

type Props = {
    getProduct: Product;
    editin?: boolean
}

interface FormProduct {
    title: string;
    description: string;
    price: number;
    rating: number;
    [key: string]: string | number; // This is the index signature
}

interface ProductInput {
    id: string;
    name: keyof Product;
    label: string;
    type: string;
    placeholder: string;
}



export default function createProductForm({ getProduct, editin }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [product, setProduct] = useState<FormProduct>({
        title: "",
        description: "",
        price: 0,
        rating: 0
    })
    const [imageProps, setImageProps] = useState<any>({
        color: ""
    })
    const [uploadProduct, setUploadProduct] = useState(false)
    const [disableCreateButton, setDisableCreateButton] = useState(false)

    const [imageOpen, setImageOpen] = useState(false)
    const [image, setImage] = useState<ImageUrl[]>([]);

    const { createProduct, updateProduct, updateStatus, product: productData, setCollectionTypeId, collectionTypeId, error, isLoading } = useProductManagement()
    const { updateProductImage, createProductImage, createImageUrl, error: imgErr, deleteImageColor } = useProductImageManagement()
    const { imageId, imagesColor, changeColor, changeImageId, changeProductInfo, productInfo } = useProductStore();
    // updateProductStatus
    // const { data } = useFetchData({ url: '/api/collectionType' })
    let data
    useEffect(() => {

        if (getProduct) {
            setProduct({
                rating: getProduct?.rating,
                description: getProduct?.description,
                price: getProduct?.price,
                title: getProduct?.title
            })
            setCollectionTypeId(getProduct?.collectionTypeId || "")
            changeProductInfo({
                id: getProduct.id,
                title: getProduct.title
            })
        }
    }, [getProduct])

    console.log(disableCreateButton)
   

    useEffect(() => {
        if (isEditing) {
            setUploadProduct(true)
        }
    }, [isEditing])

    // create a Product
    const addProduct = async (FormData: FormData) => {
        if (!editin) {
            await createProduct(FormData)
            setDisableCreateButton(true)
        } else {
            await updateProduct(FormData, productInfo.id)
        }

        if (error) {
            setDisableCreateButton(false)
            // Toast({ title: "Error!!!", description: `${error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (productData) {
            setUploadProduct(true)
            changeProductInfo({
                id: productData?.id!,
                title: productData?.title!
            })
            setProduct({
                title: "",
                description: "",
                price: 0,
                rating: 0
            })
            // Toast({ title: "Operation success", description: `${productData?.title} created successfully!!`, className: "bg-green-500" })
        }
    }
    const fileUpload = async (image: ImageUrl[]) => {
        console.log(FormData)
        // server function
        await createImageUrl(image)

        // error handling
        if (imgErr) {
            // Toast({ title: "Error!!!", description: `${error}`, variant: "destructive" })
            return;
        }

        // data successfully recieved
        if (productData) {
            setImageOpen(false)
            if (getProduct?.uploadStatus !== "SUCCESS") {
                await updateStatus(productInfo.id)
            }
            // Toast({ title: "Operation success", description: `${productData?.title} created successfully!!`, className: "bg-green-500" })
        }

    }
    const changeProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const changeDesc = (desc: string) => {
        setProduct(prev => {
            return {
                ...prev,
                description: desc
            }
        })
    }
    const mutateImage = (FormData: FormData) => {
        if (isEditing) {
            // mutate({ color: imageProp.color, id: imagesId })
            updateProductImage(FormData)
        } else {
            createProductImage(FormData)
        }
    }
    const setImageProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value, e.target.name)
        setImageProps((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const editColor = (id: string, color: string) => {
        setIsEditing(true)
        changeImageId(id)
        changeColor(color)
        const events: any = {
            target: {
                name: "color",
                value: color
            }
        }
        setImageProperty(events)
    }
    const addMore = (id: string) => {
        setImageOpen(true)
        changeImageId(id)
    }
    const DeleteImageColor = async (id: string) => {
        await deleteImageColor(id)

        // error handling
        // if (response?.error) {
        //     Toast({ title: "Error!!!", description: `${response.error}`, variant: "destructive" })
        //     return;
        // }

        // if (response?.data) {
        //     Toast({ title: "Operation success", description: `${response.data.color} deleted successfully!!`,className: "bg-green-500" })
        // }
    }
    const arr = []

    for (let index = 0; index < 40; index++) {
        arr.push(index) 
       }

    console.log(arr)

    // console.log(collectionTypeId)
    return (
        <div className='shadow-[0px_2px_10px_5px_rgba(201,201,201,0.47)] rounded-[.5rem]'>
            <div className='md:flex p-8 px-[3rem] gap-[3rem]'>
                <form action={addProduct} className='flex-[4] items-center'>
                    <div>
                        {/* porduct inputs */}
                        {productInputs.map((input) => {
                            // console.log(product[input.name])
                            return (
                                <div className="flex flex-col gap-4 mb-4" key={input.id}>
                                    <label className='font-semibold text-[2rem] '>{input.label}</label>
                                    <input className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        name={input.name}
                                        onChange={(e) => changeProduct(e)}
                                        value={product[input.name] || ""}
                                    />
                                </div>
                            )
                        })}
                        {/* select dropdown component */}

                        <Dropdown
                            btnTitle='pick a collection-type'
                            emptyText='There are no collection-type at the moment'
                            data={data}
                            setFunction={setCollectionTypeId}
                            defaultValue={collectionTypeId}
                        />
                        {/* <textarea name="description" id="description"
                            value={product.description}
                            onChange={(e) => changeProduct(e)}
                            className='resize-none p-4 border-2 block  border-gray-300 text-[1.8rem]  focus-visible:outline-none font-medium placeholder:text-[1.5rem]'
                            placeholder='write a description' cols={30} rows={10}></textarea> */}

                        <RichTextEditor content={product.description} onChange={changeDesc} clx="text-[1.8rem] w-full max-w-[400px]  font-medium placeholder:text-[1.5rem]" />
                        <div>
                        <Button
                            type='button'
                            aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-task-created-alert" data-hs-overlay="#hs-task-created-alert"
                            variant="ghost" className="text-[1.4rem] font-medium h-16">
                           Add a size to the Product
                        </Button>
                        <Modal >
                            <div>
                                <form action="">
                                    <p className='text-[2rem] font-semibold'>Add size info</p>
                                    <div className='flex gap-8 items-center '>
                                        <input type="number" name='quantity' value="" placeholder='' className='border-b-2 border-gray-300 bg-gray-50 text-[1.8rem]  focus-visible:outline-none'/>
                                        <input type="number" name='quantity' value="" placeholder=''/>
                                    </div>
                                </form>
                                <div className='overflow-auto h-[70vh]'>
                                    {
                                       arr.map(i=><p className='text-[2rem] font-medium' >{i}</p>)
                                    }
                                </div>
                            </div>
                                
                        </Modal>
                        </div>
                        {/* <button onClick={uploadFirst} className='send-btn mt-4'>Send</button> */}
                        {!disableCreateButton && <FormSubmitButton text='Save' />}


                    </div>
                </form>


                {/* product Image upload */}
                <div className='flex-[5]'>
                    {!uploadProduct ?
                        // show a placeholder for an upload
                        <div className='flex flex-col items-center gap-8 justify-center h-full'>
                            <img className='rounded-[50%] h-[150px] w-[150px] ' src=" https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="no-image" />
                            <p className='text-[3rem] font-bold capitalize text-gray-400'>add the product to add an image</p>
                        </div> :
                        // show the image upload component
                        <div className='flex flex-col gap-8'>
                            <div>
                                <p className='text-[2rem] font-bold flex gap-4 items-center'>Upload Image <Upload /></p>
                            </div>
                            <form action={mutateImage}>
                                <div>
                                    {imageInputs?.map((input) => (
                                        <div className="flex flex-col gap-4 mb-4" key={input.id}>
                                            <label className='font-semibold text-[2rem] '>{input.label}</label>
                                            <input 
                                            className='border-b-2 border-gray-300 text-[1.8rem]  focus-visible:outline-none'
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                name={input.name}
                                                onChange={(e) => setImageProperty(e)}
                                                value={imageProps[input.name] || ""}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <FormSubmitButton text='Save' />
                            </form>


                            <article>
                                {
                                    getProduct?.image?.map(img => {
                                        return <div key={img.id} >
                                            <div className='p-[1rem] flex items-center gap-8'>
                                                <p className='text-[2rem] font-bold capitalize flex items-center'>
                                                    {img.color}
                                                    <DropdownMenu >
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                // disabled={img.id === imageId}
                                                                variant="ghost" className="h-8 w-8 p-0 " size="icon">
                                                                <span className="sr-only">Open menu</span>
                                                                <ChevronDown size={16} color="#000" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[200px] p-4">

                                                            {/* <DropdownMenuSeparator /> */}
                                                            <DropdownMenuItem onClick={() => editColor(img.id, img.color)} >
                                                                <span className="text-[1.5rem] p-2 font-medium capitalize" >Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => {
                                                                DeleteImageColor(img.id)
                                                                changeImageId(img.id)
                                                            }}>
                                                                <span className="text-[1.5rem] p-2 font-medium capitalize">Delete </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </p>
                                                <Button onClick={() => addMore(img.id)} variant="outline" size="icon">
                                                    <Plus size={10} color="#000" />
                                                </Button>
                                                {/* {isLoading && img.id === imagesId && <div className='flex items-center justify-center'>
                                                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                                </div>} */}
                                            </div>
                                            <div >
                                                {img.file.length > 0 &&
                                                    <CreateProductCarouselImage files={img.file} />
                                                }
                                                {/* <Button onClick={() => addMore(img.id)} variant={'secondary'}>{img.file.length > 0 ? "Add more" : "Add Image"}</Button> */}
                                            </div>
                                        </div>
                                    })
                                }
                            </article>
                        </div>}

                </div>
            </div>
            <Dialog
                // open={1 > 0}
                open={imageOpen}
                onOpenChange={() => setImageOpen(false)}>
                <DialogContent className='h-[60%] max-w-[600px]'>
                    <DialogHeader className='text-left'>
                        <DialogTitle className='text-[2rem]'>Upload your image</DialogTitle>
                        <DialogDescription className='text-[1.6rem]'>
                            Upload image based on the color <span className='text-[1rem] font-bold'>(max to upload once is 5)</span>
                        </DialogDescription>
                        <div className={`flex justify-start w-full h-[50%] !mt-[2rem]`}>
                            <UploadProductImage
                                productData={getProduct}
                                fileUpload={fileUpload}
                                setImage={setImage}
                                image={image}
                                imageId={imageId}
                            />
                            {/* if (res) {
                                        const newImage = res.map((r: any) => {
                                            return {
                                                // name: r.name,
                                                url: r.url,
                                                key: r.key,
                                                imageId: imageId
                                            }
                                        })
                                        fileUpload(newImage)
                                        setImage([...newImage, ...image])

                                        // console.log("Files: ", newImage);
                                    } */}
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
