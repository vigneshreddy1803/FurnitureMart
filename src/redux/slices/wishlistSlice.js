import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: JSON.parse(localStorage.getItem("furnituremart_wishlist")) || [] },
  reducers: {
    toggleWishlist(state, action) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      state.items = exists ? state.items.filter((item) => item.id !== action.payload.id) : [...state.items, action.payload];
      localStorage.setItem("furnituremart_wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist(state, action) { state.items = state.items.filter((item) => item.id !== action.payload); localStorage.setItem("furnituremart_wishlist", JSON.stringify(state.items)); }
  }
});
export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;