export const SERVER_URL = process.env.SERVER_URL as string;
export const API_URL = {
  root: (url = "") => `${url ? url : ""}`,
  auth: (url = "") => API_URL.root(`/auth${url}`),
  users: (url = "") => API_URL.root(`/users${url}`),
  stores: (url = "") => API_URL.root(`/stores${url}`),
  products: (url = "") => API_URL.root(`/products${url}`),
  categories: (url = "") => API_URL.root(`/categories${url}`),
  colors: (url = "") => API_URL.root(`/colors${url}`),
  brands: (url = "") => API_URL.root(`/brands${url}`),
  reviews: (url = "") => API_URL.root(`/reviews${url}`),
  orders: (url = "") => API_URL.root(`/orders${url}`),
  statistics: (url = "") => API_URL.root(`/statistics${url}`),
  files: (url = "") => API_URL.root(`/files${url}`),
  materials: (url = "") => API_URL.root(`/materials${url}`),
  styles: (url = "") => API_URL.root(`/styles${url}`),
  productVariants: (url = "") => API_URL.root(`/product-variants${url}`),
  sizes: (url = "") => API_URL.root(`/sizes${url}`),
  userFavorites: (url = "") => API_URL.root(`/user-favorites${url}`),
  basket: (url = "") => API_URL.root(`/baskets${url}`),

};
