import React from 'react';
import Navigationitem from './Navigationitem/Navigationitem';
import Classes from './Navigationitems.css';

const navigationitems =(props)=>(//list of navigation items seen at right side top in desktop
    // and left top sidebar in mobile using classes.navigationitems
    <ul className={Classes.Navigationitems}>
        {/* here exact is passed as props so all nav link not have exact */}
        <Navigationitem link="/" exact>
            Burger Builder
        </Navigationitem >
        {props.isAuthenticated?<Navigationitem link="/orders">
            Orders
        </Navigationitem>:null}
        {!props.isAuthenticated
            ?<Navigationitem link="/auth">Authenticate</Navigationitem>
            :<Navigationitem link="/logout">LOG out</Navigationitem>
        }
    </ul>
);

export default navigationitems;


