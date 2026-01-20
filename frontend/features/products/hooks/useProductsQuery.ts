import {useQuery} from "@tanstack/react-query";
import {getAllProducts, getSomeNewProducts} from "../services/product.service";

export const useGetSomeNewProducts = (quantity: number) => {
    return useQuery({
        queryKey: ["newProducts"],
        queryFn: ()=> getSomeNewProducts(quantity)
    })
}
export const useGetAllProducts = (page = 1, limit = 16) => {
    return useQuery({
        queryKey: ["all_products", page, limit],
        queryFn: ({ queryKey }) => {
            const [, page, limit] = queryKey as ["all_products", number, number];
            return getAllProducts(page, limit);
        },
    });
};