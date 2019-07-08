import React from 'react';

import NagivationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attackedClasess = ['SideDrawer', 'Close'];
    if (props.open){
        attackedClasess = ['SideDrawer', 'Open'];
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attackedClasess.join(' ')}>
                <nav>
                    <NagivationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;

