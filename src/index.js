import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import './index.css'
import createConfiguredStore from './configureStore'

const { store, persistor } = createConfiguredStore();

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'));

