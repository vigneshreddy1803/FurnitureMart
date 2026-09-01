import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [] },
  reducers: {
    addOrder(state, action) { state.items.push(action.payload); }
  }
});
export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;