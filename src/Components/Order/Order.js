import React from 'react';
import Classes from './Order.css';

const order=(props)=>{

    const ingredients=[];//array for having jaon with key name value amount
    // console.log("ok",props.ingredients,props.price);

    for(let ingredientName in props.ingredients){//run loop in ingredients where each is ingredient 
            //name salad,baconetc:-
            ingredients.push({
                name:ingredientName,
                amount:props.ingredients[ingredientName]
            });
    }


    const ingredientOutput=ingredients.map(ing=>{//run map to get each ingredients type
        return <span
                style={{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin:'0 8px',
                    border:'1px solid #ccc',
                    padding:'5px'
                    }}
                key={ing.name}>{ing.name}({ing.amount})</span>;
    })


    return(<div className={Classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>);
}


export default order;