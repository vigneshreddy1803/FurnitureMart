import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("furnituremart_cart")) || [];
const persist = (items) => localStorage.setItem("furnituremart_cart", JSON.stringify(items));

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: saved },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      persist(state.items);
    },
    removeFromCart(state, action) { state.items = state.items.filter((item) => item.id !== action.payload); persist(state.items); },
    updateQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
      persist(state.items);
    },
    clearCart(state) { state.items = []; persist(state.items); }
  }
});
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;