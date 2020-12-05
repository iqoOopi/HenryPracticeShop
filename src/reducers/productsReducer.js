import { ActionTypes } from '../actions/types'

export const productsReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_PRODUCTS: 
            return action.payload
        case ActionTypes.FETCH_PRODUCTS:
            return action.payload
        default:
            return state;
    }
}