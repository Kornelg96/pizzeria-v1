import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        productsCart: [],
        cartquantity: 0,
        total: 0,
        quantity: 0,
        
    },
    reducers: {
        addProduct: (state, action) => {
            let item = state.productsCart.find((item) => item[0]._id === action.payload[0]._id && item.size === action.payload.size);
            if (state.productsCart.includes(item)) {
                let itemm = state.productsCart.find((item) => item[0]._id === action.payload[0]._id && item.size === action.payload.size);
                item.price = itemm.price + ((itemm.price2 * action.payload.quantity));
                item.quantity += action.payload.quantity;
                state.quantity += action.payload.quantity;
                state.total = state.total + ((itemm.price * action.payload.quantity) / itemm.quantity);
            } else {
                state.cartquantity += 1;
                state.productsCart.push(action.payload);
                state.total += action.payload.price;
                state.quantity += action.payload.quantity;
            }
        },
        removeProduct: (state, action) => {
            let itemm = state.productsCart.find((item) => item.id === action.payload.id && item.color===action.payload.color && item.size === action.payload.size);
            state.cartquantity -= 1;
            state.total = state.total - itemm.price;
            state.quantity -= itemm.quantity;
            state.productsCart=state.productsCart.filter((item)=>item !== itemm)
        },
        removeOne: (state, action) => {
            let item = state.productsCart.find((item) => item.id === action.payload);
            if (item.quantity > 1) {
                state.total = state.total - (item.price / item.quantity);
                item.price = item.price - (item.price / item.quantity);
                item.quantity = item.quantity - 1;
                state.quantity -= 1;


            } else {
                state.cartquantity -= 1;
                state.productsCart = state.productsCart.filter((item) => item.id !== action.payload);
                state.total -= item.price;
                state.quantity -= item.quantity;
            }
        },
        addOne: (state, action) => {
            let item = state.productsCart.find((item) => item.id === action.payload);
            state.total = state.total + (item.price / item.quantity);
            item.price = item.price + (item.price / item.quantity);
            item.quantity = item.quantity + 1;
            state.quantity += 1;
        },
        reset: (state) => {
            state.productsCart = [];
            state.cartquantity = 0;
            state.total = 0;
          },

    }
})

export const { addProduct, removeProduct, removeOne, addOne,reset } = cartSlice.actions
export default cartSlice.reducer;