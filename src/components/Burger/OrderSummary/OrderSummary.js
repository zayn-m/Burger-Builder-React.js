import React, {Component} from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
        console.log("[OrderSummary] will update");
    }

    render (){
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
            return (<li key={ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>:
                    {this.props.ingredients[ingredientKey]}
            </li> );
        });

        return (
            <>
                <h3>Your order</h3>
                <p>A tasty burger with following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <strong>Total Price: {this.props.price.toFixed(2)} </strong>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success'  clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </>
        );
    }

}

export default OrderSummary;