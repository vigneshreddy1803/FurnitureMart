import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, findUser } from "../../services/users";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  const user = await findUser(credentials.email, credentials.password);
  return user || rejectWithValue("Email or password is incorrect.");
});

export const registerUser = createAsyncThunk("auth/registerUser", async (data, { rejectWithValue }) => {
  const existing = await findUser(data.email);
  if (existing) return rejectWithValue("An account with this email already exists.");
  return createUser({ name: data.name, email: data.email, password: data.password, role: "customer" });
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: JSON.parse(localStorage.getItem("furnituremart_user")) || null, error: null, status: "idle" },
  reducers: {
    logout(state) { state.user = null; localStorage.removeItem("furnituremart_user"); }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; state.error = null; localStorage.setItem("furnituremart_user", JSON.stringify(action.payload)); })
      .addCase(loginUser.rejected, (state, action) => { state.error = action.payload; })
      .addCase(registerUser.fulfilled, (state, action) => { state.user = action.payload; state.error = null; localStorage.setItem("furnituremart_user", JSON.stringify(action.payload)); })
      .addCase(registerUser.rejected, (state, action) => { state.error = action.payload; });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;