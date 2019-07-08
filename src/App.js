import React, { Component } from 'react';

import {Route, BrowserRouter} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import './sass/main.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
