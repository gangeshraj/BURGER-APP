import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'}
];

const buildcontrols=(props)=>(
    <div className={Classes.BuildControls}>
        <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(
                ctrl=>(
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />)
                        )
        }
        <button 
        className={Classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>
            Check out
        </button>
    </div>
);

export default buildcontrols;