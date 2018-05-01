import React from 'react';
import Classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Menu from '../Sidedrawer/Menu/Menu';

const toolbar=(props)=>(
    // this functional component is responsible for menubar above screen
    <header className={Classes.Toolbar}>
        {/* below clicking menu component is horizontal three lines which bring sidedrawer on mobile screens */}
        <div><strong><Menu clicked={props.toggleClickHandler}/></strong></div>
        {/* below logo component of hamburger on center of top of screen */}
        <Logo height="80%"/>
        {/* display them only when desktop else not show*/}
        <nav className={Classes.Desktoponly}>
            {/* list of items to be shown in navigationitems component */}
            <Navigationitems isAuthenticated={props.isAuth}/>
        </nav>
    </header>

);

export default toolbar;