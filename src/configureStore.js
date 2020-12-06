import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { reducers } from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart']
  }

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=> {
    const store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(thunk)
    ));
    const persistor = persistStore(store)
    return {store, persistor}
}

