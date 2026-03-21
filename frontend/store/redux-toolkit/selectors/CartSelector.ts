import {createSelector} from "@reduxjs/toolkit"
import type {RootState} from "@/store/redux-toolkit/store";

export const selectCartItems = (state: RootState) => state.cartReducer;

export const makeSelectItemQuantity = (productId: number) => createSelector(selectCartItems, (items)=>{
    const item = items.items.find((it) => it.product.id === productId);
    return item?.count || 0
})
export const selectCartCount = createSelector(selectCartItems, (items)=> items.items.reduce((total, item)=>total + item.count, 0))
