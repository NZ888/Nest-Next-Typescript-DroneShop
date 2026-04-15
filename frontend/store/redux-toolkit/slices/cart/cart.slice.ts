import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartState, ISetQuantityCartItem, TCartItem} from "@/types/cart";


const initialState: ICartState = {
    totalPrice: 0,
    items: [],
}
export type productId = {
    product_id: number;
};

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TCartItem>) => {
            const item = state.items.find((item) => item.product.id === action.payload.product.id)
            if(item){
                item.count++
            }
            else {
                state.items.push(action.payload)
            }
            state.totalPrice += action.payload.product.price;
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
            const item = state.items.find(
                item => item.product.id === action.payload.product_id
            );

            if (item) {
                if (item.count > 1) {
                    item.count--;
                }
                else {
                    state.items = state.items.filter(
                        item => item.product.id !== action.payload.product_id
                    );
                }
            }
        },
        deleteProduct(state, action: PayloadAction<productId>) {
            state.items = state.items.filter(item => item.product.id !== action.payload.product_id);
        }
    },
})

export default cartSlice.reducer;
export const {addToCart, decrementQuantity, setQuantity, incrementQuantity, deleteProduct} = cartSlice.actions;