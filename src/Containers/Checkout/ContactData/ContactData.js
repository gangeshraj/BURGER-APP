import React,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios_instance_for_orders from '../../../axios_instance_for_orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Forms/Input/Input';
import WithErrorHandler from '../../../higherordercomponent/WithErrorHandler';
import * as actions from '../../../store/actions';//index file is taken by default having/index is optional
import {connect}from 'react-redux';

class ContactData extends Component{
    state={
        // loading:false,//initaially nothing is loaded from web
        alertMessage:null,//alert  message shown in form below
        buttonDisableStatus:true,//initaially button in form is not clickable
        //if all the valid becomes true than only the button is enabled
        orderForm:{
            name:{
                elementType: 'input',//type of input variable
                elementConfig:{
                    type:'text',//type of value it holds
                    placeholder:'Your Name'//place holder which ser will see
                },
                value: '',//value which will be contained when user inputs
                validation:{
                    valid:false,//initaially its not valid if it user enters
                    minlength:1,//length>=1 and what it enters matches with pattern
                    pattern:/^[a-zA-Z\s]+$/,//than valid variable  in validation key becomes true
                    invalidMessage:"Name should be only alphabets & not empty"
                    //above message is populated to alert message if on change of this form input makes
                    //valid false
                }
                
            },
            Street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value: '',
                validation:{
                    valid:false,
                    minlength:1,
                    pattern:/^[a-zA-Z0-9\s]+$/,
                    invalidMessage:"street should be only alphabets and number & not empty"
                }
            },
            zipcode:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value: '',
                validation:{
                    valid:false,
                    minlength:1,
                    pattern:/^[0-9\s]+$/,
                    invalidMessage:"Zip code should be only number & not empty"
                }
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value: '',
                validation:{
                    valid:false,
                    minlength:1,
                    pattern:/^[a-zA-Z\s]+$/,
                    invalidMessage:"Country should be only alphabets"
                }
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email-address'
                },
                value: '',
                validation:{
                    valid:false,
                    minlength:1,
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    invalidMessage:"Not a valid email format & not empty"
                    //pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    //return re.test(String(email).toLowerCase());,
                }
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:{
                    valid:true,
                    invalidMessage:null
                },
                value: 'fastest'
            }
        }
    }


    checkValidity=(value,validation)=>{//check validity of the input value from form
        value=String(value).trim()//remove white space from beg and end
        ////.log("checking equality",validation.pattern.test(String(value).toLowerCase()))
        if(value.length>=validation.minlength)
            return true && validation.pattern.test((value).toLowerCase());
        return false;
    }

    //see very very strange 2nd argument is event  and 1st argument is id passed
    //for code "changed={this.inputChangeHandler.bind(this,formElement.id)}/>" below
    //normal 1st argument is event and 2nd is id passed
    //for code changed={(event)=>this.inputChangeHandler(event,formElement.id)}
    inputChangeHandler=(event,inputIdentifier)=>{
        //alert("ok");
        // //.log("I am the inputIdentifier not event",event);
        // //.log("I am event not inputIdentifier",inputIdentifier);
        
        let orderFormDeepCopy={//deeply copying order form
            //but it has also nested json so gain weneed to deeply copy its 
            //nestedjson which we want to deeply copy
            ...this.state.orderForm
        }

        ////.log("updatedorderformDeepCopy",orderFormDeepCopy===this.state.orderForm)

        let formElementDeepCopy={//again this deeply copying is done because this.state.order form
            //is having nested json from the above code the this.state.orderForm key value
            //is deeply copied
            ...orderFormDeepCopy[event]//dont be confused event is acting as identifying the input type
        }
        ////.log("formElementDeepCopy",formElementDeepCopy,formElementDeepCopy===this.state.orderForm[event])

        ////.log("able to spread",formElementDeepCopy.validation);
        let validationDeepcopy={// again it is nested so deepy copying
            //as I want validation in state should not be updated
            ...formElementDeepCopy.validation
        }
        ////.log("validationDeepCopy",validationDeepcopy)
        

        //the value is updated as user enters the data
        formElementDeepCopy.value=inputIdentifier.target.value;//here inputIdentifier is acting as event

        ////.log("sending",formElementDeepCopy.value,validationDeepcopy);

        //check validity of users inputted value as with the value entered by user as first argument
        //and deep copied object of validation{} object from state
        validationDeepcopy.valid=this.checkValidity(formElementDeepCopy.value,validationDeepcopy);


        ////.log("wgy",validationDeepcopy.valid);
        if(validationDeepcopy.valid===false){
            //since it is invalid populate its invalidMessage
            this.setState({alertMessage:validationDeepcopy.invalidMessage})
        }
        else{
            //if its valid now we neeed not to popualate invalidMessage
            this.setState({alertMessage:null})
        }


        formElementDeepCopy["validation"]=validationDeepcopy;
        orderFormDeepCopy[event]=formElementDeepCopy;
        //now update original state
        this.setState({orderForm:orderFormDeepCopy});
        ////.log(this.state.orderForm)

    }


    orderHandler=(event=>{
        event.preventDefault();//prevent submission of form 

        // this.setState((previousState,props)=>{
        //     return {
        //         loading:true//loading is false here so negated to true
        //     }
        // })



        const formData={};//here form data will be stored

        for(let formElementIdentifier in this.state.orderForm){
                //in each iteration we get name,street,key in fromElementIdentifier
                formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
                //above key is name,street,zipcode//value is user entered value
        }


        const order={//populating dummy data for sendingto firebase server
            ingredient:this.props.ings,//burgeringredients
            price:this.props.price,//its price
            submitFormData:formData,//form data got,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);

        // axios_instance_for_orders.post('/orders.json',order)//url appended to our base url received in axios
        // .then(response=>
        //     {
        //     this.setState((previousState,props)=>{
        //         return {//this return is not returning ftom function but returning the changed state
        //             loading:false,//loading is true from above so negated to false again,
        //         }
        //     })
        //     //it is able to get history props even we dont directly route this component to
        //     //Route Component but we use Route render
        //     this.props.history.push('/');//going back to main page
        // })
        // .catch(error=>this.setState((previousState,props)=>{
        //     return {
        //         loading:false,//loading is true from above so negated to false again
        //     }
        // }))

    })

    render(){
        const formElementsArray=[];//it will contain form elements property
        //which will be sent to <input.... as it could be passed as props

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,//key is name,street,zipcode
                config:this.state.orderForm[key]//config is type and placeholder
            })
        }


        let form=(
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map((formElement)=>{
                        return <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            valid={this.state.orderForm[formElement.id].validation.valid}
                            changed={this.inputChangeHandler.bind(this,formElement.id)}/>
                            // aboveis alternate of  below line of code but the event is passed 
                            // implicitly at last where in below we are passing explicitly as 1st argument
                            // changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
                })}
                <Button 
                    // if any one is invalid make button invalid
                    disabled={!(this.state.orderForm.name.validation.valid && 
                        this.state.orderForm.Street.validation.valid &&
                        this.state.orderForm.country.validation.valid  &&
                        this.state.orderForm.zipcode.validation.valid &&
                        this.state.orderForm.email.validation.valid)
                    }
                    btnType="Success"
                    clicked={this.orderHandler}
                    >Order
                </Button>
                <div style={{color:"red"}}>
                {/* this is alert message which is shown when user makes mistake */}
                    {this.state.alertMessage?this.state.alertMessage:null}
                </div>
            </form>
        );


        if(this.props.loading)
            form=<Spinner/>;

        return (
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProps=state=>{
    //console.log(state.orderReducing)
    return {
        ings:state.burgerBuilderReducing.ingredients,
        price:state.burgerBuilderReducing.total_price,
        loading:state.orderReducing.loading,
        token:state.authReducing.token,
        userId:state.authReducing.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios_instance_for_orders));

