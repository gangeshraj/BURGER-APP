import React,{Component} from 'react';
import Modal from '../Components/UI/Modal/Modal';
import Auxillary from './Auxillary';

const WithErrorHandler=(WrappedComponent,axios)=>{

    return class extends Component{//anonymous class

        state={
            error:null//it is null as there is no error in the beginning
        }

        componentDidMount(){

            axios.interceptors.request.use(request=>{
                
                this.setState({error:null});//again remove all the error if requesting again a new request
                return request;//must to be returned so request can continue
            });
            axios.interceptors.response.use(res=>res,errorobject=>{//we are not interested in response 
                //but must return it so response can continue
                //object we receive from firebase but the error object we receive from 
                //firebase which is a javascript object
                this.setState({error:errorobject});//error if we received in response
            });

        }

        removeErrorMessage=()=>{//on clicking backDrop the error message is removed
            this.setState({error:null});
        }

        render(){
        return (
            <Auxillary>
                <Modal 
                    modalClosed={this.removeErrorMessage}
                    show={this.state.error}>
                    {/* show modal if error!==null  */}
                    {this.state.error?this.state.error.message:null}
                    {/* 1.since modal is always present in the component if there is no
                    error than this.state.error will throw error so in ternary operator
                    2.there will be message property returned by error object in firebase*/}
                </Modal>
                <WrappedComponent {...this.props}></WrappedComponent>
            </Auxillary>
        );

        }
    }
};

export default WithErrorHandler;
