export const APP_URL = process.env.APP_URL as string;

export const PUBLIC_URL = {
  root: (url = "") => `${url ? url : ""}`,
  home: () => PUBLIC_URL.root("/"),
  login: () => PUBLIC_URL.root("/auth/login"),
  register: () => PUBLIC_URL.root("/auth/register"),
  auth: (page = "") => PUBLIC_URL.root(`/auth/${page}`),

  explorer: (query = "") => PUBLIC_URL.root(`/explorer${query}`),
  product: (id: "") => PUBLIC_URL.root(`/product/${id}`),
  category: (id: "") => PUBLIC_URL.root(`/category/${id}`),
};

export const DASHBOARD_URL = {
  root: (url = "") => `/dashboard${url ? url : ""}`,
  home: () => DASHBOARD_URL.root("/"),
  favorites: () => DASHBOARD_URL.root("/favorites"),
};
export const ADMIN_URL = {
  root: (url = "") => `/admin${url ? url : ""}`,

  home: (storeId = "") => ADMIN_URL.root(`/${storeId}`),

  products: (storeId = "") => ADMIN_URL.root(`/products`),
  productCreate: (storeId = "") => ADMIN_URL.root(`/${storeId}/products/create`),
  productEdit: (storeId = "", id = "") => ADMIN_URL.root(`/${storeId}/products/${id}`),

  categories: (storeId = "") => ADMIN_URL.root(`/${storeId}/categories`),
  categoryCreate: (storeId = "") => ADMIN_URL.root(`/${storeId}/categories/create`),
  categoryEdit: (storeId = "", id = "") => ADMIN_URL.root(`/${storeId}/categories/${id}`),

  reviews: (storeId = "") => ADMIN_URL.root(`/reviews`),

  statistics: (storeId = "") => ADMIN_URL.root(`/statistics`),

  settings: (storeId = "") => ADMIN_URL.root(`/settings`),

  attributes: (storeId = "") => ADMIN_URL.root(`/attributes`),
};
