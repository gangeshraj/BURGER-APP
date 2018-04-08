import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';


const INGREDINT_PRICE={
    salad:1.2,
    bacon:1.5,
    cheese:2.1,
    meat:2.5

}

class BurgerBuilder extends Component{
    
    constructor(props){
        super(props);
        this.state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
                    },
        total_price:4,
        purchasable:false,
        purchasing:false
               }
    }

    openModel=()=>{
        this.setState({purchasing:true});
    }

    addIngredientHandler=(type)=>{
        const oldcount=this.state.ingredients[type];
        const updatedcount=oldcount+1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedcount;
        const new_price=this.state.total_price+INGREDINT_PRICE[type];
        this.setState({total_price:new_price,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldcount=this.state.ingredients[type];
        if(oldcount<=0)
            return ;
        const updatedcount=oldcount-1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedcount;
        const new_price=this.state.total_price-INGREDINT_PRICE[type];
        this.setState({total_price:new_price,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState=(ingredients)=>{
        console.log("here");
        const sum=Object.keys(ingredients)
                  .map((key,value,ok)=>{
                        return ingredients[key]
                  })
                  .reduce((sum,elem)=>{
                      return sum+elem;
                  },0);
        console.log(sum);
        this.setState({purchasable:sum>0})

    }

    closeModal=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        alert("Continue shopping");
    }
    
    render(){

        const disabledInfo={
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }


        return  <Auxillary>
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.closeModal}
                    price={this.state.total_price}
                    />
                </Modal>
                <Burger  ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.total_price}
                    purchasable={this.state.purchasable}
                    ordered={this.openModel}
                />
               </Auxillary>
    }
}

export default BurgerBuilder;
