import { ActionTypes } from './types'
import { getProducts, checkout } from '../repository';
const _ = require('lodash');

export const fetchAllProducts = () => {
    return async (dispatch) => {
        const response = await getProducts();

        dispatch({
            type: ActionTypes.FETCH_PRODUCTS,
            payload: response.data
        })
    }
}

export const postCheckout = () => {
    return async (dispatch, getState) => {
        const {cart} = getState();
        try{
            const response = await checkout(cart);
            alert (response.data);
        } catch (err) {
            alert(err.response.data);
        }
        
    }
}

//Home Page
export const addToCart = (id) => {
    
    return (dispatch, getState) => {
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

        dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: cart
        })
    }
}

//Cart Page
export const addQuantity = (id) => {
    return (dispatch, getState) => {
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
}


export const removeItem = (id) => {
    return (dispatch, getState) => {
        const { cart = [] } = getState();
        
        dispatch({
            type: ActionTypes.REMOVE_ITEM,
            payload: cart.filter(e => e.id !== id)
        })
    }

}

export const subtractQuantity = (id) => {
    return (dispatch, getState) => {
        const { cart = [] } = getState();

        const inCartItem = _.find(cart, ['id', id]);
        if (--inCartItem.qty === 0) {
           _.remove(cart, e=>e.id === id);
        }
        
        dispatch({
            type: ActionTypes.SUB_QUANTITY,
            payload: cart
        })
    }
}


