import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import App from './App';
import './materialize-theme.css'
import './index.css';
import createConfiguredStore from './configureStore'

const { store, persistor } = createConfiguredStore();

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <ReactNotification />
        <App />
    </PersistGate>
</Provider>, document.getElementById('root'));

