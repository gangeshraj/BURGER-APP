import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
//axios for sending http request to our fire base server
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../higherordercomponent/WithErrorHandler';

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
        ingredients:null,//ingredientsin burger which changes the burger on 
        //screen will be fetched from firebase database
        total_price:4,//base price which is always 4 without any ingredients 
        //and it have theprice of the whole burger
        purchasable:false,//if added atleast one ngredient make it true else false
        purchasing:false, //when modal box opens it ismade true as now you are proceeding for purchase,
        error:false,//if there is no errorit is false else populate it
        loading:false //if false not show spinners else show spinners 
        //it happens when we click on continue button on modal box 
        //and data is sent to firebase server but response is not received
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

        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.total_price);
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryParams.join('&')
        })
    }


    componentDidMount(){
        axios_instance_for_orders.get('/ingredients.json')//getting data from 
        //firebase backend 
        .then(response=>{//response object from firebase has data property
            this.setState({ingredients:response.data});
            //console.log(this.state.ingredients);
            //now price is updated
            // let updated_price=this.state.total_price+(this.state.ingredients.salad*INGREDINT_PRICE.salad)
            // +(this.state.ingredients.cheese*INGREDINT_PRICE.cheese)+(this.state.ingredients.bacon*INGREDINT_PRICE.bacon)+
            // (this.state.ingredients.meat*INGREDINT_PRICE.meat)
            // this.setState({total_price:updated_price})
            // this.updatePurchaseState(this.state.ingredients);//update purchase ability
        })
        .catch(error=>{//make error as true so a error message is
            //initialized to burger which is shown instead of burger
            this.setState({error:true});
        });


    }
    




    
    render(){


        const disabledInfo={//a copy of ingredients object
            ...this.state.ingredients
        };

        for (let key in disabledInfo){//if any ingredient is 0 or less its decrease button is diabled
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummary=null;//order summary is null inititally seen on modal

        //  if the error state is true some error occured show error message 
        //  else
        //  show spinner
        let burger=this.state.error?<p style={{textAlign:"center",color:"red",textTransform:"uppercase"}}>
        Ingredient's can't be loaded</p>:<Spinner/>;

        // now if ingredients !==null means ingredients fetched from server
        // initaialize burger to be rendered
        if(this.state.ingredients)
            {
            burger=(<Auxillary>
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
                    );

                // As order summary was null , now ingredients are fetched from server
                // so we can have order summary populated with ingredients received from
                //firebase server
                orderSummary=<OrderSummary 
                // it has details inmodal in order summary component
                ingredients={this.state.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.closeModal}
                price={this.state.total_price}
                />;
            };

            //ingredients not received so we need to show spinner 
            //in order summary present in modal as no ingredients received
            if(this.state.loading)//if order is sent means we are loading show spinner
                orderSummary=<Spinner/>;//else above will be shown

        return  <Auxillary>
                {/* above high order component */}
                {/* below modal box component show when user is purchasing */}
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    {orderSummary}
                </Modal>
                {burger}
               </Auxillary>
    }
}


// wrapped in high order component so as to show error using modal component
// this is very optimal way now we can use any component which uses axios to 
// have high order component WithErrorHandler wrappping it
export default WithErrorHandler(BurgerBuilder,axios_instance_for_orders);
