import {IProduct} from "@/types/product";

export type TCartItem = {
    product: Pick<IProduct, "id" | "name" | "price" | "oldPrice" | "slug" | "mainImage">
    count: number;
    totalProductPrice: number;
}

export interface ICartState {
    items: TCartItem[],
    totalPrice: number,
}

export interface ISetQuantityCartItem{
    product_id: number;
    count: number;
}
