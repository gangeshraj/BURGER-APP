import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Classes from './Sidedrawer.css';
import Backdrop from '../../Backdrop/Backdrop';
import Auxillary from '../../../../higherordercomponent/Auxillary';

const sidedrawer=(props)=>{
    let attachedClasses=[Classes.Sidedrawer,Classes.Close];//close siderawer

    if(props.showstatus===true){//open sidedrawer
        attachedClasses=[Classes.Sidedrawer,Classes.Open]
    }
    
    return (
        <Auxillary>{/*high order component*/}
            <Backdrop showstatus={props.showstatus} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%"/>{/*height is passedas props to logo*/}
                <nav>{/*loads navigationitems component which is list*/}
                    <Navigationitems/>
                </nav>
            </div>
        </Auxillary>
    );
}

export default sidedrawer;
