/***********************************************************************************************************/
/****     ENTRY POINT of the React application - Responsible for rendering the root component           ****/
/***********************************************************************************************************/
/** Step 1: Import core dependencies including React, ReactDOM, App component, and global styles          **/
/** Step 2: Import Redux store and Redux Persist setup                                                    **/
/** Step 3: Use BrowserRouter for routing, Redux Provider for state, and PersistGate for persisted state  **/
/***********************************************************************************************************/

/** Step 1: Import React and root component **/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
/** Step 2: Import Redux and routing-related packages **/
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store, { persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

/** Step 3: Render the App inside root div, wrapped with routing and state providers **/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

