"use client"

import { Button } from '@/components/ui/button';
import { firebaseConfig, storage } from '@/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';


type Props = {
    productData: Product | null,
    fileUpload: any,
    setImage: any,
    image: any,
    imageId: string
}

export default function UploadProductImage({ productData, fileUpload, setImage, image, imageId }: Props) {
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const { getRootProps, getInputProps } = useDropzone({
        // accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            // console.log(acceptedFiles)
            setFiles(acceptedFiles);
        }
    });
    // console.log("first")
    // console.log(firebaseConfig)



    const uploadToFirebase = async (file: any, ccName?: string, onProgress?: any) => {

        const imageRef = ref(storage, `products/${ccName}/${file.name}`);

        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgress && onProgress(progress);
                    // console.log(progress)
                    // console.log(snapshot.bytesTransferred / snapshot.totalBytes)
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                    reject(error);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                    resolve({
                        downloadUrl,
                        metadata: uploadTask.snapshot.metadata,
                    });
                }
            );
        });

    };

    const upload = async () => {
        if (files?.length === 0) return;
        setUploading(true)
        let newFiles = []
        for (let i = 0; i < files?.length; i++) {
            let imageFile = files[i];

            const uploadRes = await uploadToFirebase(imageFile, productData?.title,
                (v: any) =>
                    setProgress(v)
            )
            newFiles.push(uploadRes)

            // console.log(uploadRes)
        }
        const updatedImgFile = newFiles.map((r: any) => {
            return {
                // name: r.name,
                url: r.downloadUrl,
                key: r.metadata?.fullPath,
                imageId: imageId
            }
        })
        setUploading(false)
        setFiles([])
        fileUpload(updatedImgFile)
        setImage([...updatedImgFile, ...image])
    }

    // console.log(image)
    return (
        <div className='border-2 w-full p-4 grid items-center justify-center'>
            <div className='grid gap-4 cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone grid' })}>
                    <input {...getInputProps()} disabled />
                    <CloudUpload className='w-12 h-12 mx-auto' />
                    <p className='text-[1.4rem] font-medium text-blue-500'>Drag 'n' drop some files here, or click to select files</p>
                    {/* {console.log(files)} */}
                    {files?.length === 0 && <Button>Choose File(s)</Button>}
                    {/* {files.length > 0 && <Button onClick={upload}>{progress > 0
                    ? `${progress}%` : `Upload ${files.length} file${files.length > 1 ? "s" : ""}`
                } </Button>} */}
                </div>
                {files?.length > 0 && <Button onClick={upload}>{uploading
                    ? `${progress}%` : `Upload ${files.length} file${files?.length > 1 ? "s" : ""}`
                } </Button>}
            </div>
            {/* {uploading &&
                <Button
                    variant={'link'}
                    className='text-[1.2rem] font-medium text-red-500'>
                    Cancel
                </Button>
            } */}
        </div>
    )
}
