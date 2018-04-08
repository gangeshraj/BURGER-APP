import React from 'react';
import Classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger=(props)=>{
     
    let transformedingredients=Object.keys(props.ingredients).map(ingkey=>{
          return [...Array(props.ingredients[ingkey])].map((_,index)=>{
               return  <BurgerIngredient key={ingkey+index} type={ingkey}/>
                })
            }).reduce((arr,el)=>{
                console.log("ok",arr);
                console.log("yes",el);
                return arr.concat(el);
            },[]);
    if(transformedingredients.length===0){
            transformedingredients=<p>Please add ingredients</p>;
    }

     return (<div className={Classes.Burger}>
        <BurgerIngredient type="bread-top"/>
             {transformedingredients}
        <BurgerIngredient type="bread-bottom"/>
    </div>)
};

export default Burger;
