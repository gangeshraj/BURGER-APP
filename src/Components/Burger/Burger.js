import React from 'react';
import Classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger=(props)=>{//renders burger
     
    let transformedingredients=Object.keys(props.ingredients).map(ingkey=>{
            //here ing key is salad,salmon etc the ingredients
            //here props.ingredients[ingkey] is the numerical value of that ingredient
            //spread operator makes that much big array which is populated
            //by map function so map returns array of burgeringredient component of that uch numbers
            return [...Array(props.ingredients[ingkey])].map((_,index)=>{
               return  <BurgerIngredient key={ingkey+index} type={ingkey}/>
                })
            //reduce makes these separate array[array(ingredientsvalue)] into a single array having 
            //these components
            }).reduce((arr,el)=>{//reduce returns finally arr
                return arr.concat(el);//el is each burger ingredient type array received from above
            },[]);//initial value of arr

    
    if(transformedingredients.length===0){
            transformedingredients=<p>Please add ingredients</p>;
    }

     return (<div className={Classes.Burger}>
        <BurgerIngredient type="bread-top"/>
             {transformedingredients}
             {/* aboveis ingredients added inburger ingredient component  */}
        <BurgerIngredient type="bread-bottom"/>
    </div>)
};

export default Burger;
