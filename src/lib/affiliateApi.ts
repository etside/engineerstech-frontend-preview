const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function getToken(): string | null {
  return localStorage.getItem("affiliate_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const affiliateApi = {
  register: (data: Record<string, string>) =>
    request<{ affiliate: any; token: string }>("/affiliate/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (email: string, password: string) =>
    request<{ affiliate: any; token: string }>("/affiliate/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  dashboard: () => request<any>("/affiliate/dashboard"),

  clicks: (page = 1) => request<any>(`/affiliate/clicks?page=${page}`),

  conversions: (page = 1) => request<any>(`/affiliate/conversions?page=${page}`),

  payouts: (page = 1) => request<any>(`/affiliate/payouts?page=${page}`),

  referralLink: (url?: string) =>
    request<{ ref_code: string; referral_url: string }>(
      `/affiliate/referral-link${url ? `?url=${encodeURIComponent(url)}` : ""}`
    ),

  logout: () => localStorage.removeItem("affiliate_token"),

  isAuthenticated: () => !!getToken(),
};
