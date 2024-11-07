import React, { useState } from "react";
import {
  updateImageProduct,
  CreateImageProduct,
  CreateUrl,
  DeleteImageColor
} from "../services/productService";
import { useProductStore } from "../store/hooks";

export function useProductImageManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageClr, setImageClr] = useState<Image>();
  const { imageId, productInfo } = useProductStore();

  const createProductImage = async (product: FormData) => {
    const id = productInfo.id;
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await CreateImageProduct(product, id);
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setImageClr(data);
    } catch (err) {
      setError("Failed to create product");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const createImageUrl = async (image: ImageUrl[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await CreateUrl(image);
      console.log(data)
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setImageClr(data[0]);
    } catch (err) {
      setError("Failed to create product");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const updateProductImage = async (product: FormData) => {
    const id = productInfo.id;
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await updateImageProduct(product, id, imageId);
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setImageClr(data);
    } catch (err) {
      setError("Failed to create product");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const deleteImageColor = async (id:string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await DeleteImageColor(id);
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setImageClr(data);
    } catch (err) {
      setError("Failed to create product");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProductImage,createProductImage, createImageUrl, isLoading, error, imageClr,deleteImageColor };
}
