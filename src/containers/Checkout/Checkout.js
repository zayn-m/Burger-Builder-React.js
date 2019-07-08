import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        //console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            
            if (param[0] === 'totalPrice') {
                totalPrice = param[1];
            }
            else {
                // ['salad': '1']
                ingredients[param[0]] = +param[1]; // + is used to convert it to a number
            }
            
            //console.log(ingredients[param[0]] = +param[1]);
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 onCheckoutCancel={this.onCheckoutCancel}
                                 onCheckoutContinue={this.onCheckoutContinue} />

                <Route path={this.props.match.url + '/contact-data'}
                        render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                     totalPrice={this.state.totalPrice}
                                                     {...props} />)} />

            </div>
        );
    }

}

export default Checkout;