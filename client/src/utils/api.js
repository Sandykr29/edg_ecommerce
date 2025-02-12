export const API_BASE_URL = "http://localhost:8000/api"
// ||"https://edg-ecommerce.onrender.com/api";

export const AUTH_REGISTER = `${API_BASE_URL}/auth/register`;
export const AUTH_LOGIN = `${API_BASE_URL}/auth/login`;
export const GET_PRODUCTS = `${API_BASE_URL}/products`;
export const ADD_TO_CART = (id) => `${API_BASE_URL}/products/:${id}`;