import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')) : [],
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : 0,
};

const cartSlice = createSlice({
    name: "cart",   
    initialState: initialState,
    reducers: { 
        setTotalItems(state, value) {
            state.totalItems = value.payload
        },
        // Add to cart
        addToCart(state, action) {
            const course = action.payload
            const index = state.cart.findIndex((item)=> item._id === course._id)

            if(index >= 0) {
                toast.error("Course already in cart")
                return;
            }

            state.cart.push(course);
            state.totalItems++;
        }
        // remove from cart
        // reset cart
    }
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer


