import {API} from "@/config/api"
import {handleResponse} from "@/lib/helpers";

export const getSomeNewProducts = async (quantity: number) => {
    const res = await fetch(API.routes.products.getSomeNewProducts(quantity), {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })

    return handleResponse(res)

}