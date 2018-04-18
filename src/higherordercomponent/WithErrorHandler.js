import React,{Component} from 'react';
import Modal from '../Components/UI/Modal/Modal';
import Auxillary from './Auxillary';

const WithErrorHandler=(WrappedComponent,axios)=>{

    return class extends Component{//anonymous class

        state={
            error:null//it is null as there is no error in the beginning
        }

        componentWillMount(){//if we invoke it in componentDidMount
            //than it will run only when the child component componentDidMount gets completed
            //so wrapped component which is burger builder which ischildren component if gets error in http
            //response the intercepto here wont run asit is parent component so we have to have it as 
            //component will mount so we need to setUp interceptors before child component
            //which can only happen if c

            this.reqInterceptor=axios.interceptors.request.use(request=>{
                
                this.setState({error:null});//again remove all the error if requesting again a new request
                return request;//must to be returned so request can continue
            });
            this.resInterceptor=axios.interceptors.response.use(res=>res,errorobject=>{//we are not interested in response 
                //but must return it so response can continue
                //object we receive from firebase but the error object we receive from 
                //firebase which is a javascript object
                this.setState({error:errorobject});//error if we received in response
            });

        }

        removeErrorMessage=()=>{//on clicking backDrop the error message is removed
            this.setState({error:null});
        }

        componentWillUnmount(){//since this componet can wrap many components 
            //so if during running if any component will mount it will use the same instance of
            //the component so than we are attaching multiple interceptors to same axios instance therefore 
            //it will create interceptors in memory somwhere so it is better to 
            //eject them when component is not required
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        render(){
        return (
            <Auxillary>
                <Modal 
                    closeModal={this.removeErrorMessage}
                    show={this.state.error}>
                    {/* show modal if error!==null  */}
                    {this.state.error?this.state.error.message:null}
                    {/* 1.since modal is always present in the component if there is no
                    error than this.state.error will throw error so in ternary operator
                    2.there will be message property returned by error object in firebase*/}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Auxillary>
        );

        }
    }
};

export default WithErrorHandler;
