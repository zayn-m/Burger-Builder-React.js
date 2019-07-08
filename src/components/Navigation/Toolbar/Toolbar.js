import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems  from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className='Toolbar'>
        <div onClick={props.showSideDrawer}>MENU</div>
        
        <nav className='DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;