import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// Fallback: fetch from static db.json when json-server is not available (e.g. Netlify)
async function fetchFromStaticDB(resource, id) {
  const res = await fetch("/data/db.json");
  const db = await res.json();
  if (id) return db[resource].find((item) => String(item.id) === String(id));
  return db[resource];
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    return (await api.get("/products")).data;
  } catch {
    return await fetchFromStaticDB("products");
  }
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id) => {
  try {
    return (await api.get(`/products/${id}`)).data;
  } catch {
    return await fetchFromStaticDB("products", id);
  }
});

export const createProduct = createAsyncThunk("products/createProduct", async (product) => (await api.post("/products", product)).data);
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, changes }) => (await api.patch(`/products/${id}`, changes)).data);
export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => { await api.delete(`/products/${id}`); return id; });

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
      .addCase(fetchProductById.fulfilled, (state, action) => { state.status = "success"; state.selected = action.payload; })
      .addCase(createProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => { state.items = state.items.filter((item) => item.id !== action.payload); });
  },
});
export const { deleteProduct } = productSlice.actions;
export default productSlice.reducer;
