// features/product/hooks/useProductManagement.ts

import { useState } from 'react';
import { createProduct as createProductService, updateProduct as updateProductService, updateProductStatus} from '../services/productService';

export const useProductManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState<string | null>(null);
  const [collectionTypeId, setCollectionTypeId] = useState("")

  const createProduct = async (product: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const {data,error} = await createProductService(product, collectionTypeId);
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setProduct(data)
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const updateProduct = async (product: FormData,id:string) => {
    setIsLoading(true);
    setError(null);
    try {
      const {data,error} = await updateProductService(product, collectionTypeId,id);
      // You might want to update some local state or trigger a refetch here
      setError(error);
      setProduct(data)
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const updateStatus = async (id:string) => {
    setIsLoading(true);
    setError(null);
    try {
      const {data} = await updateProductStatus(id);
      // You might want to update some local state or trigger a refetch here
      setError("");
      setProduct(data)
    } catch (err) {
      setError('Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };


  return { createProduct, isLoading, error, product,setCollectionTypeId,collectionTypeId,updateProduct, updateStatus };
};