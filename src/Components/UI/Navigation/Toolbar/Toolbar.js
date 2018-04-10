import React from 'react';
import Classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Menu from './Menu/Menu';

const toolbar=(props)=>(
    <header className={Classes.Toolbar}>
        <div><strong><Menu clicked={props.toggleClickHandler}/></strong></div>
        <Logo height="80%"/>
        <nav className={Classes.Desktoponly}>
            <Navigationitems/>
        </nav>
    </header>

);

export default toolbar;