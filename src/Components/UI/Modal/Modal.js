import React,{Component} from 'react';
import Classes from './Modal.css';
import Auxillary from '../../../higherordercomponent/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    
    shouldComponentUpdate(nextProps,prevState){//if this modal is shown han only we need 
        //to update it and obviously child component of modal orderSummary component 
        //therefore it enhances performance
        return nextProp.show!==this.props.show;
    }
    
    render(){
     return (
        <Auxillary>
        <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
        <div 
            className={Classes.Modal}
            style={{
                transform:this.props.show? 'translateY(0)':'translateY(-100vh)',
                opacity:this.props.show?'1':'0'
            }}
        >
            {this.props.children}
        </div>
        </Auxillary>
         );
    }
}

export default Modal;

