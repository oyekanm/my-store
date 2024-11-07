import React from 'react'

type Props = {
    files?: ImageUrl[];
}

export default function ProductListImages({ files }: Props) {
    return (
        <div className='px-8 w-[160px] grid gap-8 '>
            {files?.map((file, index) => (
                <span key={index} className="">
                    {/* <Image alt={file.id} src={file.url} width={100} height={100} className="w-full h-full"/> */}
                    <img alt={file.id} src={file.url} width={100} height={100} className="w-full h-full" />
                </span>
            ))}
        </div>
    )
}
