import { ActionTypes } from '../actions/types'
export const cartReducer = (state = [], action) => {
    switch (action.type) {
    //INSIDE HOME COMPONENT
        case ActionTypes.ADD_TO_CART: {
            return [...action.payload]
        }

    //INSIDE CART PAGE
        case ActionTypes.REMOVE_ITEM: {
            return [...action.payload]
        }

        case ActionTypes.ADD_QUANTITY: {
            return [...action.payload]
        }

        case ActionTypes.SUB_QUANTITY: {
            return [...action.payload]
        }

        default:
            return state
    }
}
