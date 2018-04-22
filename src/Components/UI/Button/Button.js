import React from 'react';

import Classes from './Button.css';

const button=(props)=>{
    let classInButton=[Classes.Button,Classes[props.btnType]]
    if(props.disabled){
        classInButton.push(Classes.Disabled)
    }
    return (<button
        disabled={props.disabled}
        className={classInButton.join(" ")}  
        onClick={props.clicked}>
            {props.children}
        </button>);
}

export default button;