import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className='CheckoutSummary'>
            <h1>Hope it tastes well!</h1>
            <div style={{width: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.onCheckoutCancel}>Cancel</Button>
            <Button btnType='Success' clicked={props.onCheckoutContinue}>Continue</Button>
        </div>
    );
} 

export default checkoutSummary;