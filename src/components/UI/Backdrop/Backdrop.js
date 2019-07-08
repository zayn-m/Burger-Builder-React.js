import React from 'react';

const backdrop = (props) => {
    return props.show ? <div className='Backdrop' onClick={props.clicked}></div> : null
}

export default backdrop;