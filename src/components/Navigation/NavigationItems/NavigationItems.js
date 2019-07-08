import React from 'react';

import {NavLink} from 'react-router-dom';

import NavigationItem from './NavigationsItem/NavigationItem';

const navigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
      
    </ul>
);

export default navigationItems;