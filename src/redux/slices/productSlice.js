import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => (await api.get("/products")).data);
export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id) => (await api.get(`/products/${id}`)).data);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], selected: null, status: "idle" },
  reducers: {
    deleteProduct(state, action) { state.items = state.items.filter((item) => item.id !== action.payload); }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = "success"; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state) => { state.status = "error"; })
      .addCase(fetchProductById.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.status = "success"; state.selected = action.payload; });
  },
});
export const { deleteProduct } = productSlice.actions;
export default productSlice.reducer;