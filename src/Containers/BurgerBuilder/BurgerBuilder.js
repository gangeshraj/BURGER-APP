import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
//axios for sending http request to our fire base server

//global pricing of burger ingredients
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
        ingredients:{//ingredientsin burger which changes the burger on screen
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
                    },
        total_price:4,//base price which is always 4 without any ingredients 
        //and it have theprice of the whole burger
        purchasable:false,//if added atleast one ngredient make it true else false
        purchasing:false //when modal box opens it ismade true as now you are proceeding for purchase
               }
    }

    openModel=()=>{//it opens modal
        this.setState({purchasing:true});
    }

    addIngredientHandler=(type)=>{//type is passed of ingredient
        const oldcount=this.state.ingredients[type];//last count is received of that ingredient in burger
        const updatedcount=oldcount+1;
        const updatedIngredients={//make a copy of the ingredients not a refrence copy
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedcount;//in the newly created object make the ingredient 
        //type as the new one
        const new_price=this.state.total_price+INGREDINT_PRICE[type];
        //new price =last totalprice+ ingredient newly price
        this.setState({total_price:new_price,ingredients:updatedIngredients});
        //updating the totalprice ,ingredients onject replaced by new ingredients oject
        this.updatePurchaseState(updatedIngredients);
        //call above method to know whether burger is purchasable or not
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
        //call above method to know whether burger is purchasable or not
    }

    updatePurchaseState=(ingredients)=>{
        //here sum of the the ingredients should be >0 to make burge purchasable
        const sum=Object.keys(ingredients)//loop on ingredients object passed in function
                  .map((key,value)=>{//as key value pair
                        return ingredients[key]
                  })
                  .reduce((sum,elem)=>{//reduce function where elem is passed from map "ingredients[key]"
                      return sum+elem;//sum is the final value to be returned
                  },0);// 0 is the initial value of sum
        this.setState({purchasable:sum>0})

    }

    closeModal=()=>{//close modal and since we are not purchasing make purchasing false
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{//method invoked on continue button clicked on modal box
        //alert("Continue shopping");
        const order={//populating dummy data for sending
            ingredient:this.state.ingredients,
            price:this.state.total_price,
            customer:{
                name:"gangesh",
                address:{
                    street:"st zavier palce",
                    zipcode:"765432",
                    country:"India"
                },
                email:"gangeshraj1@gmail.com",
            },
            deliveryMethod:"fastest"
        }
        axios_instance_for_orders.post('/orders.json',order)//url appended to our base url received in axios
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }
    
    render(){

        const disabledInfo={//a copy of ingredients object
            ...this.state.ingredients
        };

        for (let key in disabledInfo){//if any ingredient is 0 or less its decrease button is diabled
            disabledInfo[key]=disabledInfo[key]<=0;
        }


        return  <Auxillary>
                {/* above high order component */}
                {/* below modal box component show when user is purchasing */}
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    <OrderSummary 
                    // it has details inmodal in order summary component
                    ingredients={this.state.ingredients}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.closeModal}
                    price={this.state.total_price}
                    />
                </Modal>
                {/* below burger componen render burger on screen */}
                <Burger  ingredients={this.state.ingredients}/>
                {/* below build controls render build controls on screen */}
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
