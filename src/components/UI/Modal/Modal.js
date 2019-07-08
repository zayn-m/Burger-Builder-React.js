import React,{Component} from 'react';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.show != this.props.show || nextProps.children !== this.props.children){
            return true;
        }
        else
            return false;
    }

    componentWillUpdate(){
        console.log('[Modal] will update');
    }

    render(){
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className='Modal' style={{
                                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                            opacity: this.props.show ? '1' : '0'   
                                        }}>
                    {this.props.children}
                </div>
             </>
        );
    }
} 

export default Modal;