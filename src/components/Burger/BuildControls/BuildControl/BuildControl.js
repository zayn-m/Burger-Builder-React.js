import React from 'react';

const buildControl = (props) => (
    <div className='BuildControl'>
        <div className='Label'>{props.label}</div>
        <button className='Less' onClick={props.subtracted} disabled={props.disabled}>Less</button>
        <button className='More' onClick={props.added}>More</button>
    </div>
);

export default buildControl;