import axios from 'axios';
import { Configure } from './configure'

const BASE_URL = 'http://localhost:8081';

export function getProducts() {
	const response = axios.post( `${BASE_URL}/graphql`,{
		query: `{
			products {
				id,
				name,
				price,
				imgUrl,
				stock,
				description
			}
		}`
	})
	return response;
}

export function searchProducts(searchValue) {
	const response = axios.post( `${BASE_URL}/graphql`,{
		query: `{
			search(searchValue:"${searchValue}") {
				id,
				name,
				price,
				imgUrl,
				stock,
				description
			}
		}`
	})
	return response;
}

export async function getUserAccountInfo() {
	const henryStoreInfo = localStorage.getItem(Configure.localStorageKey);
	try {
		const { token } = JSON.parse(henryStoreInfo);

		const result = await axios.get(`${BASE_URL}/api/account`,
			{
				params: {
					token
				}
			})
		return result;

	} catch (e) {
		return false
	}
}

export function checkout(cart) {
	const response = axios.post(`${BASE_URL}/api/checkout`, { cart });
	return response;
}

export async function login(data) {
	try {
		const response = await axios.post(`${BASE_URL}/api/auth`, { name: data.username, password: data.password });
		const loggedInUser = {
			token: response.data.token,
			tokenExpiration: Date.now() + 2 * 60 * 60 * 1000
		}
		localStorage.setItem('henryStoreInfo', JSON.stringify(loggedInUser));
		return response.data;
	} catch (err) {
		return await Promise.reject('Authentication Failed!');
	}
}

export function isAuthenticated() {
	const henryStoreInfo = localStorage.getItem(Configure.localStorageKey);
	try {
		const infoJSON = JSON.parse(henryStoreInfo);
		return infoJSON.token && infoJSON.tokenExpiration > Date.now()
	} catch (e) {
		return false
	}
}
