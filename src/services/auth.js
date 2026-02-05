import api from "./api";

/* ---------- Fetch logged-in user ---------- */
export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

/* ---------- Logout (backend sync) ---------- */
export const logoutUser = async () => {
  await api.post("/auth/logout");
};
