import React from 'react';

import Burger from '../../../Components/Burger/Burger'
import Button from '../../../Components/UI/Button/Button';
import Classes from './CheckoutSummary.css';

const chectOutSummary=(props)=>{

        return <div className={Classes.checkOutSummary}>
                    <h1>HOPE it tastes well</h1>
                    <div style={{width:'300px',height:'300px',margin:'auto'}}>
                        <Burger ingredients={props.ingredients}/>
                        <Button btnType="Danger">CANCEL</Button>
                        <Button btnType="Success">CONTINUE</Button>
                    </div>
               </div>

}