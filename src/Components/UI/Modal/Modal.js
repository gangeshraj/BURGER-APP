import React,{Component} from 'react';
import Classes from './Modal.css';
import Auxillary from '../../../higherordercomponent/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    
    shouldComponentUpdate(nextProps,prevState){//if this modal is shown han only we need 
        //to update it and obviously child component of modal orderSummary component 
        //therefore it enhances performance
        //nextProps.show!==this.props.show

        //** WE ARE ADDING ONE MORE CONDITION **/
        //nextProps.children !== this.props.children as if it is not written 
        //we won'tbe able to see spinner in modal because it is children component of modal 

        return nextProps.show!==this.props.show||nextProps.children!==this.props.children;
    }
    
    render(){
     return (
        <Auxillary>
        {/*  show backdrop if this.props.show is true*/}
        <Backdrop showstatus={this.props.show} clicked={this.props.closeModal}/>
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

