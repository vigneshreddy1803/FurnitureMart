import { api } from "../utils/api";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function findUser(email, password) {
  const params = { email };
  if (password) params.password = password;
  const response = await api.get("/users", { params });
  return response.data[0] || null;
}

export async function createUser(user) {
  const response = await api.post("/users", user);
  return response.data;
}

export async function updateUser(id, patch) {
  const response = await api.patch(`/users/${id}`, patch);
  return response.data;
}