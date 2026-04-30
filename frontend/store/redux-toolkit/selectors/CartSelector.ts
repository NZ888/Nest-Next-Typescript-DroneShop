import {createSelector} from "@reduxjs/toolkit"
import type {RootState} from "@/store/redux-toolkit/store";
import {TCartItem} from "@/types/cart";

export const selectCartItems = (state: RootState) => state.cartReducer;

export const makeSelectItemQuantity = (productId: number) => createSelector(selectCartItems, (items)=>{
    const item = items.items.find((it) => it.product.id === productId);
    return item?.count || 0
})
export const selectCartCount = createSelector(selectCartItems, (items)=> items.items.reduce((total, item)=>total + item.count, 0))

export const selectCartItemById = (productId: number) => createSelector(selectCartItems, (items)=>{
    const item = items.items.find((it) => it.product.id === productId);
    if(item) return item;
});

export const selectCartItemTotalPrice = (productId: number) => createSelector(selectCartItems, (items)=>{
    const item: TCartItem | undefined = items.items.find((it) => it.product.id === productId);
    if(item){
        return item.totalProductPrice
    }
})