import {useQuery} from "@tanstack/react-query";
import {getSomeNewProducts} from "../services/product.servise";

export const useGetSomeNewProducts = (quantity: number) => {
    return useQuery({
        queryKey: ["newProducts"],
        queryFn: ()=> getSomeNewProducts(quantity)
    })
}