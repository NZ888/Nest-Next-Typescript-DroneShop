import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartState, ISetQuantityCartItem, TCartItem} from "@/types/cart";


const initialState: ICartState = {
    totalPrice: 0,
    items: [],
}
type productId = {
    product_id: number;
};

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TCartItem>) => {
            state.totalPrice += action.payload.product.price;
            state.items.push(action.payload)
        },
        setQuantity(state, action: PayloadAction<ISetQuantityCartItem>) {
            const item = state.items.find(item => item.product.id === action.payload.product_id);
            if(item){
                item.count = action.payload.count;
            }

        },
        incrementQuantity(state, action: PayloadAction<productId>) {
            const item = state.items.find(item => item.product.id === action.payload.product_id);
            if(item){
                item.count++
            }
        },
        decrementQuantity(state, action: PayloadAction<productId>) {
            const item = state.items.find(item => item.product.id === action.payload.product_id);
            if(item){
                item.count--
            }
        }
    }
})

export default cartSlice.reducer;
export const {addToCart, decrementQuantity, setQuantity, incrementQuantity} = cartSlice.actions;