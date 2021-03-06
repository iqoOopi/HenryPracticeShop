import { store as NotifactionBox } from 'react-notifications-component';
import { ActionTypes } from './types'
import { getProducts, searchProducts, checkout } from '../repository';
const _ = require('lodash');

//Home Page
export const fetchAllProducts = () => async (dispatch) => {
    const response = await getProducts();

    dispatch({
        type: ActionTypes.FETCH_PRODUCTS,
        payload: response.data.data.products
    })
}


export const fetchSearchProducts = (searchValue) => async (dispatch) => {
    const response = await searchProducts(searchValue);

    dispatch({
        type: ActionTypes.SEARCH_PRODUCTS,
        payload: response.data.data.search
    })
}


export const addToCart = (id) => (dispatch, getState) => {
    const { products = [], cart = [] } = getState();
    const prod = _.find(products, ['id', id]);
    const inCartItem = _.find(cart, ['id', id]);

    if (inCartItem) {
        if (++inCartItem.qty > prod.stock) {
            inCartItem.qty--;
        }
    } else {
        cart.push({
            ..._.omit(prod, ['stock', 'description']),
            qty: 1
        })
    }

    NotifactionBox.addNotification({
        title: "Added to Cart",
        message: `${prod.name} X 1 added to cart`,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 1000
        }
    });

    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: cart
    })
}


//Cart Page
export const addQuantity = (id) => (dispatch, getState) => {
    const { products = [], cart = [] } = getState();
    const prod = _.find(products, ['id', id]);
    const inCartItem = _.find(cart, ['id', id]);

    if (inCartItem) {
        if (++inCartItem.qty > prod.stock) {
            inCartItem.qty--;
        }
    }

    dispatch({
        type: ActionTypes.ADD_QUANTITY,
        payload: cart
    })
}



export const removeItem = (id) => (dispatch, getState) => {
    const { cart = [] } = getState();

    dispatch({
        type: ActionTypes.REMOVE_ITEM,
        payload: cart.filter(e => e.id !== id)
    })
}


export const subtractQuantity = (id) => (dispatch, getState) => {
    const { cart = [] } = getState();
    const inCartItem = _.find(cart, ['id', id]);
    if (--inCartItem.qty === 0) {
        _.remove(cart, e => e.id === id);
    }

    dispatch({
        type: ActionTypes.SUB_QUANTITY,
        payload: cart
    })
}


export const postCheckout = () => async (dispatch, getState) => {
    const { cart } = getState();
    try {
        const response = await checkout(cart);
        alert(response.data);
    } catch (err) {
        alert(err.response.data);
    }

}



