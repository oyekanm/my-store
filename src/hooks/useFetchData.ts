import { api } from "@/service";
import useSWR from "swr";

type Props = {
    url: string,
    refresh?: number,
    setState?: (data: any) => void
}

export const useFetchData = ({refresh, url, setState}: Props) => {
    const time = refresh ?? 1000;

    const fetcher = async (url: string) => {
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            // Handle error properly
            throw error;
        }
    };

    const { data,error, mutate  } = useSWR(url, fetcher, {
        refreshInterval: time,
        suspense:true,
        onSuccess(data) {
            setState?.(data);
        },
    });

    return { data,error, mutate  };
}