import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Classes from './Sidedrawer.css';
import Backdrop from '../../Backdrop/Backdrop';
import Auxillary from '../../../../higherordercomponent/Auxillary';

const sidedrawer=(props)=>{
    let attachedClasses=[Classes.Sidedrawer,Classes.Close];

    if(props.showstatus===true){
        attachedClasses=[Classes.Sidedrawer,Classes.Open]
    }
    
    return (
        <Auxillary>
            <Backdrop showstatus={props.showstatus} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%"/>
                <nav>
                    <Navigationitems/>
                </nav>
            </div>
        </Auxillary>
    );
}

export default sidedrawer;
