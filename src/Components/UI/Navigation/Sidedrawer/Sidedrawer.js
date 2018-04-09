import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Classes from './Sidedrawer.css';
import Backdrop from '../../Backdrop/Backdrop';
import Auxillary from '../../../../higherordercomponent/Auxillary';

const sidedrawer=(props)=>{
    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={Classes.Sidedrawer}>
                <Logo height="11%"/>
                <nav>
                    <Navigationitems/>
                </nav>
            </div>
        </Auxillary>
    );
}

export default sidedrawer;