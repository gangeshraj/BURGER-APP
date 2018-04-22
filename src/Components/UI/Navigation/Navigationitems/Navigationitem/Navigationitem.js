import React from 'react';
import Classes from './Navigationitem.css'
import {NavLink} from 'react-router-dom';

const navigationitem =(props)=>(
        <li className={Classes.Navigationitem}>
                <NavLink 
                to={props.link}
                exact={props.exact}//not to have exact on all the nav list we are getting as 
                //prop from NavigationItems.js where we want it to be implemented
                activeClassName={Classes.active}>
                        {props.children}
                </NavLink>
        </li>
);

export default navigationitem;