import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'graphql-js-client';
import typeBundle from './types';
import '../../shared/app.css';

export const client = new Client(typeBundle, {
  url: 'https://vapoynt.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': '9f3767263a51ebb393ba854cbf1f68d3'
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
