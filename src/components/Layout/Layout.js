import React, {Component} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    showSideDrawer = () => {
        this.setState({showSideDrawer: true});
    }

    render(){
        return (
            <>
            <Toolbar showSideDrawer={this.showSideDrawer}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className="content">
                {this.props.children}
            </main>
         </>
        );
    }
} 

export default Layout;