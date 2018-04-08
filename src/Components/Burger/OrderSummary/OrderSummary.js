import React from 'react';
import Auxillary from '../../../higherordercomponent/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary=(props)=>{

    const ingredientSummary=Object.keys(props.ingredients)
                            .map(igkey=>(
                                <li key={igkey}>
                                    <span style={{textTransform:'capitalize'}}>{igkey}</span>
                                    :{props.ingredients[igkey]}
                                </li>   )
                                )

    return <Auxillary>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)} </strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
           </Auxillary>;

}
export default OrderSummary;