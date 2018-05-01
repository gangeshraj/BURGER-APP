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
            controls.map(//render various controls for various ingredients
                ctrl=>(
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    // above is control name for different ingredients types
                    added={()=>props.ingredientAdded(ctrl.type)}
                    removed={()=>props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />)
                        )
        }
        {/* render button which shows modal and make payment  */}
        <button 
        className={Classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>
           {props.isAuth?"ORDER NOW":"SIGN UP FOR ORDER"}
        </button>
    </div>
);

export default buildcontrols;