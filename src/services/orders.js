import { api } from "../utils/api";

export async function getOrders() {
  const response = await api.get("/orders");
  return response.data;
}

export async function createOrder(order) {
  const response = await api.post("/orders", order);
  return response.data;
}

export async function updateOrderStatus(id, status) {
  const response = await api.patch(`/orders/${id}`, { status });
  return response.data;
}
