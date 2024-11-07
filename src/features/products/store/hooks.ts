"use client"

import { useRecoilState } from "recoil";
import { productImageColor, productImageId, productInfoObject } from "./atom";

type info = { id: string; title: string }
export const useProductStore = () => {
    const [imageId, setImageId] = useRecoilState(productImageId);
    const [imagesColor, setImagesColor] = useRecoilState(productImageColor)
    const [productInfo, setProductInfo] = useRecoilState(productInfoObject);
    
   const changeProductInfo = (info:info)=>{
    setProductInfo({
        id: info.id,
        title: info.title
    })
   }
   const changeColor = (color:string)=>{
    setImagesColor(color)
   }
   const changeImageId = (id:string)=>{
    setImageId(id)
   }
  
    return {imageId,imagesColor,productInfo, changeProductInfo,changeColor,changeImageId};
  };