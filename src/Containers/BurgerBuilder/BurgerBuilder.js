import React,{Component} from 'react';
import Auxillary from '../../higherordercomponent/Auxillary';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../higherordercomponent/WithErrorHandler';

import * as  actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
//axios for sending http request to our fire base server




export class BurgerBuilder extends Component{
    
    constructor(props){
        super(props);
        this.state={
        purchasing:false, //when modal box opens it ismade true as now you are proceeding for purchase,
        // error:false,//if there is no errorit is false else populate it
        // loading:false //if false not show spinners else show spinners 
        //it happens when we click on continue button on modal box 
        //and data is sent to firebase server but response is not received
        }
    }

    openModel=()=>{

        if(this.props.isAuthenticated){
            //it opens modal
            this.setState({purchasing:true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    addIngredientHandler=(type)=>{//type is passed of ingredient
        // const oldcount=this.state.ingredients[type];//last count is received of that ingredient in burger
        // const updatedcount=oldcount+1;
        // const updatedIngredients={//make a copy of the ingredients not a refrence copy
        //     ...this.state.ingredients
        // }
        // updatedIngredients[type]=updatedcount;//in the newly created object make the ingredient 
        // //type as the new one
        // const new_price=this.state.total_price+INGREDINT_PRICE[type];
        // //new price =last totalprice+ ingredient newly price
        // this.setState({total_price:new_price,ingredients:updatedIngredients});
        // //updating the totalprice ,ingredients onject replaced by new ingredients oject
        // this.updatePurchaseState(updatedIngredients);
        // //call above method to know whether burger is purchasable or not
    }

    removeIngredientHandler=(type)=>{
        // const oldcount=this.state.ingredients[type];
        // if(oldcount<=0)
        //     return ;
        // const updatedcount=oldcount-1;
        // const updatedIngredients={
        //     ...this.state.ingredients
        // }
        // updatedIngredients[type]=updatedcount;
        // const new_price=this.state.total_price-INGREDINT_PRICE[type];
        // this.setState({total_price:new_price,ingredients:updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
        // //call above method to know whether burger is purchasable or not
    }

    updatePurchaseState=(ingredients)=>{
        //here sum of the the ingredients should be >0 to make burge purchasable
        const sum=Object.keys(ingredients)//loop on ingredients object passed in function
                  .map((key,value)=>{//as key value pair
                        return ingredients[key];
                  })
                  .reduce((sum,elem)=>{//reduce function where elem is passed from map "ingredients[key]"
                      return sum+elem;//sum is the final value to be returned
                  },0);// 0 is the initial value of sum
        //console.log("this is the sum",sum);
        return sum>0;

    }

    closeModal=()=>{//close modal and since we are not purchasing make purchasing false
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{//method invoked on continue button clicked on modal box

        // const queryParams=[];//now we dont passs query params we will manage it by redux
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.state.total_price);
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryParams.join('&')
        // })
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        
    }


    componentDidMount(){
        //console.log("component mouted",this.props.ings);
        this.props.onInitIngredients();
    }
    

    render(){
        //console.log("inside render",this.props.ings);

        const disabledInfo={//a copy of ingredients object
            ...this.props.ings
        };

        for (let key in disabledInfo){//if any ingredient is 0 or less its decrease button is diabled
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummary=null;//order summary is null inititally seen on modal

        //  if the error state is true some error occured show error message 
        //  else
        //  show spinner
        let burger=this.props.error?<p style={{textAlign:"center",color:"red",textTransform:"uppercase"}}>
        Ingredient's can't be loaded check internet connectivity</p>:<Spinner/>;

        // now if ingredients !==null means ingredients fetched from server
        // initaialize burger to be rendered
        if(this.props.ings)
            {
            burger=(<Auxillary>
                    <Burger  ingredients={this.props.ings}/>
                    {/* below build controls render build controls on screen */}
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.openModel}
                        isAuth={this.props.isAuthenticated}
                    />
                    </Auxillary>
                    );

                // As order summary was null , now ingredients are fetched from server
                // so we can have order summary populated with ingredients received from
                //firebase server
                orderSummary=<OrderSummary 
                // it has details inmodal in order summary component
                ingredients={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.closeModal}
                price={this.props.price}
                />;
            };

            //ingredients not received so we need to show spinner 
            //in order summary present in modal as no ingredients received
            // if(this.state.loading)//if order is sent means we are loading show spinner
            //     orderSummary=<Spinner/>;//else above will be shown

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

const matchStateToProps=state=>{
    //console.log("matchstatetoprops")
    return {
        ings:state.burgerBuilderReducing.ingredients,
        price:state.burgerBuilderReducing.total_price,
        error:state.burgerBuilderReducing.error,
        isAuthenticated:!!state.authReducing.token
    };
}

const matchDispatchToProps=dispatch=>{
    //console.log("matchdispatoprops")
    return {
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredients(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>{dispatch(actions.setAuthRedirectPath(path))}
    };
}


// wrapped in high order component so as to show error using modal component
// this is very optimal way now we can use any component which uses axios to 
// have high order component WithErrorHandler wrappping it
export default withRouter(connect(matchStateToProps,matchDispatchToProps)(WithErrorHandler(BurgerBuilder,axios_instance_for_orders)));
