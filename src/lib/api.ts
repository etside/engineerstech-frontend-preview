const BASE = import.meta.env.VITE_API_URL || 'http://localhost/engineerstech/public/api';

function getToken() {
  return localStorage.getItem('et_token');
}

function setToken(token: string) {
  localStorage.setItem('et_token', token);
}

function clearToken() {
  localStorage.removeItem('et_token');
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─── Auth ──────────────────────────────────────────────────────
export const auth = {
  async login(email: string, password: string) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },
  async logout() {
    await request('/auth/logout', { method: 'POST' }).catch(() => {});
    clearToken();
  },
  async getUser() {
    if (!getToken()) return null;
    return request('/auth/user').catch(() => { clearToken(); return null; });
  },
  isLoggedIn() {
    return !!getToken();
  },
};

// ─── Public ────────────────────────────────────────────────────
export const api = {
  services:     (opts?: { featured?: boolean }) => request(opts?.featured ? '/services?featured=1' : '/services'),
  service:      (slug: string) => request(`/services/${slug}`),
  industries:   () => request('/industries'),
  industry:     (slug: string) => request(`/industries/${slug}`),
  products:     () => request('/products'),
  product:      (slug: string) => request(`/products/${slug}`),
  blog:         () => request('/blog'),
  blogPost:     (slug: string) => request(`/blog/${slug}`),
  team:         () => request('/team'),
  testimonials: () => request('/testimonials'),
  logos:        () => request('/logos'),
  contact:      (data: Record<string, string | null | undefined>) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  caseStudies:  () => request('/case-studies'),
  caseStudy:    (slug: string) => request(`/case-studies/${slug}`),
  resources:    () => request('/resources'),
  requestResource: (id: number | string, data: { name?: string; email: string }) =>
    request(`/resources/${id}/request`, { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Admin ─────────────────────────────────────────────────────
function adminRequest(path: string, options: RequestInit = {}) {
  return request(`/admin${path}`, options);
}

function body(data: unknown) {
  return JSON.stringify(data);
}

export const adminApi = {
  stats: () => adminRequest('/stats'),

  // Services
  getServices:    () => adminRequest('/services'),
  createService:  (d: unknown) => adminRequest('/services', { method: 'POST', body: body(d) }),
  updateService:  (id: number|string, d: unknown) => adminRequest(`/services/${id}`, { method: 'PUT', body: body(d) }),
  deleteService:  (id: number|string) => adminRequest(`/services/${id}`, { method: 'DELETE' }),

  // Industries
  getIndustries:    () => adminRequest('/industries'),
  createIndustry:   (d: unknown) => adminRequest('/industries', { method: 'POST', body: body(d) }),
  updateIndustry:   (id: number|string, d: unknown) => adminRequest(`/industries/${id}`, { method: 'PUT', body: body(d) }),
  deleteIndustry:   (id: number|string) => adminRequest(`/industries/${id}`, { method: 'DELETE' }),

  // Products
  getProducts:    () => adminRequest('/products'),
  createProduct:  (d: unknown) => adminRequest('/products', { method: 'POST', body: body(d) }),
  updateProduct:  (id: number|string, d: unknown) => adminRequest(`/products/${id}`, { method: 'PUT', body: body(d) }),
  deleteProduct:  (id: number|string) => adminRequest(`/products/${id}`, { method: 'DELETE' }),

  // Blog
  getBlog:        () => adminRequest('/blog'),
  createPost:     (d: unknown) => adminRequest('/blog', { method: 'POST', body: body(d) }),
  updatePost:     (id: number|string, d: unknown) => adminRequest(`/blog/${id}`, { method: 'PUT', body: body(d) }),
  deletePost:     (id: number|string) => adminRequest(`/blog/${id}`, { method: 'DELETE' }),

  // Team
  getTeam:        () => adminRequest('/team'),
  createMember:   (d: unknown) => adminRequest('/team', { method: 'POST', body: body(d) }),
  updateMember:   (id: number|string, d: unknown) => adminRequest(`/team/${id}`, { method: 'PUT', body: body(d) }),
  deleteMember:   (id: number|string) => adminRequest(`/team/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials:    () => adminRequest('/testimonials'),
  createTestimonial:  (d: unknown) => adminRequest('/testimonials', { method: 'POST', body: body(d) }),
  updateTestimonial:  (id: number|string, d: unknown) => adminRequest(`/testimonials/${id}`, { method: 'PUT', body: body(d) }),
  deleteTestimonial:  (id: number|string) => adminRequest(`/testimonials/${id}`, { method: 'DELETE' }),

  // Logos
  getLogos:       () => adminRequest('/logos'),
  createLogo:     (d: unknown) => adminRequest('/logos', { method: 'POST', body: body(d) }),
  updateLogo:     (id: number|string, d: unknown) => adminRequest(`/logos/${id}`, { method: 'PUT', body: body(d) }),
  deleteLogo:     (id: number|string) => adminRequest(`/logos/${id}`, { method: 'DELETE' }),

  // Submissions
  getSubmissions:     () => adminRequest('/submissions'),
  markSubmissionRead: (id: number|string) => adminRequest(`/submissions/${id}`, { method: 'PATCH' }),
  deleteSubmission:   (id: number|string) => adminRequest(`/submissions/${id}`, { method: 'DELETE' }),

  // Case Studies
  getCaseStudies:    () => adminRequest('/case-studies'),
  createCaseStudy:   (d: unknown) => adminRequest('/case-studies', { method: 'POST', body: body(d) }),
  updateCaseStudy:   (id: number|string, d: unknown) => adminRequest(`/case-studies/${id}`, { method: 'PUT', body: body(d) }),
  deleteCaseStudy:   (id: number|string) => adminRequest(`/case-studies/${id}`, { method: 'DELETE' }),

  // Resources
  getResources:    () => adminRequest('/resources'),
  createResource:  (d: unknown) => adminRequest('/resources', { method: 'POST', body: body(d) }),
  updateResource:  (id: number|string, d: unknown) => adminRequest(`/resources/${id}`, { method: 'PUT', body: body(d) }),
  deleteResource:  (id: number|string) => adminRequest(`/resources/${id}`, { method: 'DELETE' }),
  getResourceLeads: () => adminRequest('/resource-leads'),

  // Settings
  getSettings:    () => adminRequest('/settings'),
  updateSettings: (d: unknown) => adminRequest('/settings', { method: 'POST', body: body(d) }),

  // Upload image
  async upload(file: File, folder = 'general'): Promise<string> {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const res = await fetch(`${BASE}/admin/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  },
};
