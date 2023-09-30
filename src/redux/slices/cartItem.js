import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);

      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        const newItem = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(newItem);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
