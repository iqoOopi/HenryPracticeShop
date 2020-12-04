import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { cartReducer } from './cartReducer'

export const reducers = combineReducers({
    products: productsReducer,
    cart: cartReducer
});