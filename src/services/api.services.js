import axios from 'axios';

const LOCAL = 'localhost:3000';
const CATEGORIES_CDN_URL = `http://${LOCAL}/categories`;
const PRODUCTS_CDN_URL = `http://${LOCAL}/products`;
const FAVORITES_CDN_URL = `http://${LOCAL}/favorites`;
const CART_CDN_URL = `http://${LOCAL}/cartItems`;


export function fetchCategories() {
  return axios.get(CATEGORIES_CDN_URL);
}

export function fetchProducts() {
  return axios.get(PRODUCTS_CDN_URL);
}

export function fetchFavorites() {
  return axios.get(FAVORITES_CDN_URL);
}

export function fetchCartItems() {
  return axios.get(CART_CDN_URL);
}

export function setFavorites(payload) {
  return axios.put(FAVORITES_CDN_URL, { favorites: [ ...payload ] });
}

export function setProducts(payload) {
  return axios.put(PRODUCTS_CDN_URL, { products: [ ...payload ] });
}

export function setCartItems(payload) {
  return axios.put(CART_CDN_URL, { cartItems: [ ...payload ] });
}
