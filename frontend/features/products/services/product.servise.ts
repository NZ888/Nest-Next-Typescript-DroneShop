import {API} from "@/config/api"

export const getSomeNewProducts = async (quantity: number) => {
    const res = await fetch(API.routes.products.getSomeNewProducts(quantity), {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
    if (!res.ok) {
        let errText = "Unknown server error";

        try {
            const json = await res.json();
            if (json?.message) errText = json.message;
        } catch {
            const text = await res.text();
            if (text) errText = text;
        }

        throw new Error(errText);
    }

    return res.json()
}