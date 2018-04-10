import React,{Component} from 'react';
import Auxillary from '../../../higherordercomponent/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    
    
    componentWillUpdate(){
        //this componet will update only when the parent Modal component
        //"show" props changes as shouldComponentUpdate checks it
        //for updating
        console.log("order summaryt will update");
    }


    render(){
        
                    const ingredientSummary=Object.keys(this.props.ingredients).map(igkey=>(
                    <li key={igkey}>
                        <span style={{textTransform:'capitalize'}}>{igkey}</span>
                        :{this.props.ingredients[igkey]}
                    </li>   )
                     )
        
        
        
            return <Auxillary>
                        <h3>Your order</h3>
                        <p>A delicious burger with the following ingredients</p>
                        <ul>
                            {ingredientSummary}
                        </ul>
                        <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                        <p>Continue to check out?</p>
                        <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                        <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
                   </Auxillary>;
            }

}
export default OrderSummary;
