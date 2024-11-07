import { axiosInstance } from "@/lib";

export const api = {
    get: (url: string) => axiosInstance.get(url),
    post: (url: string, data: any) => axiosInstance.post(url, data),
  };