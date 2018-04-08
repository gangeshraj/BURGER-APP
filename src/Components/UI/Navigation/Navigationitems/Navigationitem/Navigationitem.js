import React from 'react';
import Classes from './Navigationitem.css'

const navigationitem =(props)=>(
        <li className={Classes.Navigationitem}>
                <a href={props.link}
                className={props.active?Classes.active:null}>
                {props.children}
                </a>
        </li>
);

export default navigationitem;