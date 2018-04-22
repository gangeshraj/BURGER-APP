import React,{Component} from 'react';
import Order from '../../Components/Order/Order';
import axios_instance_for_orders from '../../axios_instance_for_orders';
import WithErrorHandler from '../../higherordercomponent/WithErrorHandler';

class Orders extends Component{

    state={
        orders:[],//where we have array of json orders from firebase
        loading:true//if we loading order initially its true
    }

    componentDidMount(){//when component is mounted fetch orders
        axios_instance_for_orders.get('/orders.json')
        .then(res=>{
                let orders_received=[];//it will contain array ofjson orders
                for(let unique_key_from_firebase in res.data){//getting each order from res.data
                    //res.data will contain json of multiple keys
                    orders_received.push({
                        ...res.data[unique_key_from_firebase],//spreadall key value pAIRS of each order
                        id:unique_key_from_firebase
                    })
                }
                this.setState({loading:false,orders:orders_received})//loading is false
        })
        .catch(error=>{
            this.setState({loading:false})//if unable loaded
    })
    }

    render(){
        //console.log("passing",this.state.orders);
        return (
            <div>
                {this.state.orders.map(ord=>(//for each jsonorder in array of json
                    <Order 
                        key={ord.id}//id property we initialised above is key
                        ingredients={ord.ingredient}//pass ingredient
                        price={ord.price}/>//passprice
                ))}
            </div>
        );
    }

}

export default WithErrorHandler(Orders,axios_instance_for_orders);