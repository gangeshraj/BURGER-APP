import React from 'react';
import Classes from './Input.css';

const Input=(props)=>{


    let inputElement=null;

    switch(props.elementType){//on basis of user input go to one case
        case('input'):
            inputElement=<input 
                className={Classes.InputElement} 
                {...props.elementConfig}//it contains placeholder,type
                value={props.value}//value
                onChange={props.changed}/>;//onchange call
                break;
        case('textarea'):
            inputElement=<textarea
                className={Classes.InputElement} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
                break;
        case('select'):
            // console.log("here only",props.elementConfig.options.map(option=>{
            //     return <option 
            //                 key={option.value}
            //                 value={option.value}
            //                 onChange={props.changed}>
            //                 {option.displayValue}
            //             </option>
            // }))
            inputElement=<select onChange={props.changed}
                className={Classes.InputElement} 
                value={props.value}>
                {
                    props.elementConfig.options.map(option=>{
                        return <option 
                                    key={option.value}
                                    value={option.value}
                                    >
                                    {option.displayValue}
                                </option>
                    })
                }
                </select>;
                break;
        default:
            inputElement=<input 
            className={Classes.InputElement} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>;
    }

    return (
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
                {inputElement}
        </div>
    )

}

export default Input;