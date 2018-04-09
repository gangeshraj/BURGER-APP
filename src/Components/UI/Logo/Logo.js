import React from 'react';
import burgerimage from '../../../Assets/Images/burger-logo.png';
import Classes from './Logo.css';

const logo=(props)=>(
    <div className={Classes.Logo} style={{height:props.height}}>
        <img src={burgerimage} alt="LOGO of burger"/>
    </div>
);

export default logo;

