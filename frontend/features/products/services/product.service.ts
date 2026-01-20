import {API} from "@/config/api"
import {handleResponse} from "@/lib/helpers";

export const getSomeNewProducts = async (quantity: number) => {
    const res = await fetch(API.routes.products.getSomeNewProducts(quantity), {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })

    return handleResponse(res)
}
export const getAllProducts = async (page= 1, limit = 16) => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const res = await fetch(`${API.routes.products.allProducts}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return handleResponse(res)
}