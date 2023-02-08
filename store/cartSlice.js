import { createSlice } from "@reduxjs/toolkit";

//basucalliy enums but enums are present in js
import ProductConstants from "../constants/productConstant";

const initialState = {
    cartItems: [],
    status: ProductConstants,
}

export const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products = action.payload
            state.status = ProductConstants.SUCCESS
        },
        removeFromCart: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { addProduct, setStatus } = productSlice.actions

export default productSlice.reducer

//Thunk to make the api calls

export const fectchProducts = () => {
    return async (dispatch, getState) => {

        dispatch(setStatus(ProductConstants.LOADING))
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json()
            dispatch(addProduct(data))
            dispatch(setStatus(ProductConstants.SUCCESS))

        } catch (error) {
            dispatch(setStatus(ProductConstants.ERROR))
        }
    }
}