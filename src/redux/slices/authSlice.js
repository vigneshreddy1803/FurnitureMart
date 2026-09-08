import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, findUser, updateUser } from "../../services/users";

// The admin panel only ever accepts this single, hardcoded account.
// Even if the "users" data is edited, no other account can log in as admin.
const ADMIN_EMAIL = "vignesh@gmail.com";
const ADMIN_PASSWORD = "Vignesh@123";

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  const user = await findUser(credentials.email, credentials.password);
  if (!user) return rejectWithValue("Email or password is incorrect.");
  const now = new Date().toISOString();
  try { await updateUser(user.id, { isOnline: true, lastLogin: now }); } catch { /* activity tracking is best-effort */ }
  return { ...user, isOnline: true, lastLogin: now };
});

export const loginAdmin = createAsyncThunk("auth/loginAdmin", async (credentials, { rejectWithValue }) => {
  const email = (credentials.email || "").trim().toLowerCase();
  if (email !== ADMIN_EMAIL || credentials.password !== ADMIN_PASSWORD) {
    return rejectWithValue("Invalid admin email or password.");
  }
  const now = new Date().toISOString();
  let adminRecord = null;
  try { adminRecord = await findUser(ADMIN_EMAIL); } catch { /* fall back below */ }
  if (adminRecord) {
    try { await updateUser(adminRecord.id, { isOnline: true, lastLogin: now }); } catch { /* best-effort */ }
    return { ...adminRecord, role: "admin", isOnline: true, lastLogin: now };
  }
  return { id: "admin-vignesh", name: "Vignesh", email: ADMIN_EMAIL, role: "admin", isOnline: true, lastLogin: now };
});

export const registerUser = createAsyncThunk("auth/registerUser", async (data, { rejectWithValue }) => {
  const existing = await findUser(data.email);
  if (existing) return rejectWithValue("An account with this email already exists.");
  const now = new Date().toISOString();
  return createUser({ name: data.name, email: data.email, password: data.password, role: "customer", isOnline: true, lastLogin: now, lastLogout: null });
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { getState }) => {
  const user = getState().auth.user;
  if (user?.id) {
    const now = new Date().toISOString();
    try { await updateUser(user.id, { isOnline: false, lastLogout: now }); } catch { /* best-effort */ }
  }
  return true;
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
      .addCase(loginAdmin.fulfilled, (state, action) => { state.user = action.payload; state.error = null; localStorage.setItem("furnituremart_user", JSON.stringify(action.payload)); })
      .addCase(loginAdmin.rejected, (state, action) => { state.error = action.payload; })
      .addCase(registerUser.fulfilled, (state, action) => { state.user = action.payload; state.error = null; localStorage.setItem("furnituremart_user", JSON.stringify(action.payload)); })
      .addCase(registerUser.rejected, (state, action) => { state.error = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; localStorage.removeItem("furnituremart_user"); });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
