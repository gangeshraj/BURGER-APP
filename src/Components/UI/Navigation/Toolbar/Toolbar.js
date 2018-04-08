import React from 'react';
import Classes from './Toolbar.css';
import Logo from '../../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';

const toolbar=(props)=>(
    <header className={Classes.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
            <Navigationitems/>
        </nav>
    </header>

);

export default toolbar;