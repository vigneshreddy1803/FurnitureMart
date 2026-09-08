import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders, createOrder, updateOrderStatus } from "../../services/orders";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => await getOrders());
export const placeOrder = createAsyncThunk("orders/placeOrder", async (order) => await createOrder(order));
export const changeOrderStatus = createAsyncThunk("orders/changeOrderStatus", async ({ id, status }) => await updateOrderStatus(id, status));

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle" },
  reducers: {
    addOrder(state, action) { state.items.push(action.payload); }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => { state.status = "loading"; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.status = "success"; state.items = action.payload; })
      .addCase(fetchOrders.rejected, (state) => { state.status = "error"; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  }
});
export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
