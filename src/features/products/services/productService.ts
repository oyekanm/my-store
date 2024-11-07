import { CreateImage, CreateImageUrl, DeleteImage, UpdateImage } from '@/actions/ImageActions'
import { CreateProduct, UpdateProduct, UpdateStatus } from '@/actions/ProductActions'



export const createProduct = async (FormData: FormData,collectionTypeId: string): Promise<{data:any, error:any}> => {
  try {
    const response = await CreateProduct(FormData, collectionTypeId);
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// export const getProducts = async (): Promise<Product[]> => {
//   // Implementation to fetch products
// };

export const updateProduct = async (FormData: FormData,collectionTypeId: string, id:string): Promise<{data:any, error:any}> => {
  try {
    const response = await UpdateProduct(FormData, collectionTypeId, id);
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
export const updateProductStatus = async ( id:string): Promise<{data:any}> => {
  try {
    const response = await UpdateStatus(id);
    return {data: response?.data}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateImageProduct = async (FormData: FormData, id:string,imageId:string): Promise<{data:any, error:any}> => {
  try {
    const response = await UpdateImage(FormData, id!, imageId);
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
export const CreateImageProduct = async (FormData: FormData, id:string): Promise<{data:any, error:any}> => {
  try {
    const response = await CreateImage(FormData, id)
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
export const DeleteImageColor = async ( id:string): Promise<{data:any, error:any}> => {
  try {
    const response = await DeleteImage(id) 
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
export const CreateUrl = async (image: ImageUrl[]): Promise<{data:any, error:any}> => {
  try {
    const response = await CreateImageUrl(image)
    return {data: response?.data, error:response?.error}
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

