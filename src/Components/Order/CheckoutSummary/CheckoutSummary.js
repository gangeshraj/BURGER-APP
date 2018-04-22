import React from 'react';

import Burger from '../../../Components/Burger/Burger'
import Button from '../../../Components/UI/Button/Button';
import Classes from './CheckoutSummary.css';

const checkOutSummary=(props)=>{
        return <div className={Classes.CheckOutSummary}>
                    <h1>HOPE it tastes well</h1>
                    <div style={{width:'100%',margin:'auto'}}>
                        <Burger ingredients={props.ingredients}/>
                            <Button 
                            btnType="Danger"
                            clicked={props.checkOutCancelled}>CANCEL</Button>
                            <Button 
                            btnType="Success"
                            clicked={props.checkOutContinued}>CONTINUE</Button>
                    </div>
               </div>

}

export default checkOutSummary;