import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ReduxStore from './Store/Redux-Store';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ReduxStore}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

