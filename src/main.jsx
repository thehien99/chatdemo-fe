import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import '@fortawesome/fontawesome-free/css/all.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
