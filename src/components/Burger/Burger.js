import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    
    // convert ingredient object to array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_,i) => {
                console.log('igKey' + ingredientKey + ',' +props.ingredients[ingredientKey] + ',' + i);
                return <BurgerIngredient key={ingredientKey + i}
                                    type = {ingredientKey} />
            }); 
        }).reduce((prevValue, currentValue) => {
            return prevValue.concat(currentValue)
        }, []);

        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;