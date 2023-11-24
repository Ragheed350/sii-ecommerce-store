import { createSlice } from "@reduxjs/toolkit"
import { ProductDetailsType } from "../../../types"

interface InitialState {
  cart: (ProductDetailsType & { quantity: number })[]
}

const initialState: InitialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    AddToCart(state, action) {
      state.cart.push({ ...action.payload, quantity: 1 })
    },
    ClearCart(state) {
      state.cart = []
    },
    DeleteFromCart(state, action) {
      const ind = state.cart.findIndex((prod) => prod.id === action.payload)
      if (ind > -1) state.cart.splice(ind, 1)
    },
    ChangeQuantity(state, action) {
      const { itemId, newQuantity } = action.payload
      const ind = state.cart.findIndex((prod) => prod.id === itemId)
      if (ind > -1) state.cart[ind].quantity = newQuantity
    },
  },
})

export const { AddToCart, ClearCart, DeleteFromCart, ChangeQuantity } = cartSlice.actions

export default cartSlice
