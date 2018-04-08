import React from 'react';
import Navigationitem from './Navigationitem/Navigationitem';
import Classes from './Navigationitems.css';

const navigationitems =(props)=>(
    <ul className={Classes.Navigationitems}>
        <Navigationitem link="/" active>{/*see how active={true} is written in like active */}
            Burger Builder
        </Navigationitem>
        <Navigationitem link="/">
            Check out
        </Navigationitem>
    </ul>
);

export default navigationitems;


