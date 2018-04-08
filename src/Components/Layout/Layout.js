import React from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';

const Layout=(props)=>(
    <Auxillary>
        <Toolbar/>
        <div>toolbar ,sidebarsssss , backdrop</div>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Auxillary>
);

export default Layout;
