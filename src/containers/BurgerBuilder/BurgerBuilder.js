import React, {Component} from 'react';

import {Route, NavLink, Switch} from 'react-router-dom';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: 1,
    meat: 2,
    bacon: .9
}

class BurgerBuilder extends Component{


    state = {
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-f78b4.firebaseio.com/ingredients.json')
                .then(response => {
                    this.setState({ingredients: response.data});
                })
                .catch(error => {
                    this.setState({error: true});
                })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        // check to see number is positive
        if (oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {

        // Array of string entries 
        const sum = Object.keys(ingredients).map(ingredientKey => {
                                                return ingredients[ingredientKey];
                                                }).reduce( (newSum, el) => {
                                                    return newSum + el;
                                                }, 0);
        // purchaseable: true is sum > 0
        this.setState({purchaseable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHander = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log(this.props);
        //alert('Continue!!!');
        const queryPrams = [];
        for (let i in this.state.ingredients) {
            queryPrams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryPrams.push('totalPrice=' + this.state.totalPrice);

        const queryString = queryPrams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        
    }

    render(){

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        
        let orderSummary = null;
    
        let burger =  this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.state.ingredients){
            burger = 
                    <>    
                    <Burger ingredients={this.state.ingredients} />
                        <BuildControls ingredientAdded={this.addIngredientHandler}
                        ingredientSubtracted={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}/>
                    </>

                    orderSummary =  <OrderSummary ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHander}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false ....}
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>
                    {burger}
            </>
        );
    }
}

export default withErrorHandler( BurgerBuilder, axios );