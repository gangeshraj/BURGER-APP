import React from 'react';
import Classes from './Modal.css';
import Auxillary from '../../../higherordercomponent/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const Modal=(props)=>(
    <Auxillary>
    <Backdrop show={props.show} clicked={props.closeModal}/>
    <div 
        className={Classes.Modal}
        style={{
            transform:props.show? 'translateY(0)':'translateY(-100vh)',
            opacity:props.show?'1':'0'
        }}
    >
        {props.children}
    </div>
    </Auxillary>
)

export default Modal;

