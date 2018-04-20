import React,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import Classes from './ContactData.css';
import axios_instance_for_orders from '../../../axios_instance_for_orders';

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        },
        loading:false
    }

    orderHandler=(event=>{
        event.preventDefault();//prevent submission of form 

        this.setState((previousState,props)=>{
            return {
                loading:true//loading is false here so negated to true
            }
        })
        const order={//populating dummy data for sendingto firebase server
            ingredient:this.props.ingredients,
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
        .then(response=>this.setState((previousState,props)=>{
            return {
                loading:false,//loading is true from above so negated to false again,
                purchasing:false//to close the modal
            }
        }))
        .catch(error=>this.setState((previousState,props)=>{
            return {
                loading:false,//loading is true from above so negated to false again
                purchasing:false//to close the modal
            }
        }))

    })

    render(){
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={Classes.input}
                     type="text" name="name" placeholder="Your NAme"/>
                    <input className={Classes.input}
                     type="email" name="email" placeholder="Your mail"/>
                    <input className={Classes.input}
                     type="text" name="street" placeholder="Street"/>
                    <input className={Classes.input}
                     type="text" name="postal code" placeholder="Postal code"/>
                    <Button 
                        btnType="Success"
                        clicked={this.orderHandler}
                        >Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;