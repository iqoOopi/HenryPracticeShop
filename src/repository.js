import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getProducts() {
	const response = axios.get(`${BASE_URL}/api/products`);
	return response;
}

export function getCartProducts(cart) {
	const response = axios.post(`${BASE_URL}/api/products`, { cart });
	return response;
}

export async function login (data) {
	try {
		const response = await axios.post(`${BASE_URL}/api/auth`, { name: data.name, password: data.password });
		localStorage.setItem('x-access-token', response.data.token);
		localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
		return response.data;
	} catch (err) {
		return await Promise.reject('Authentication Failed!');
	}
}

export function isAuthenticated(){
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}
