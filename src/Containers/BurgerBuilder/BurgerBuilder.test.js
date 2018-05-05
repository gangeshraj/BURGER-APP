import React from 'react';

import {configure,
shallow } //helps to render component shallowly not deeply
from 'enzyme';

///connecting enzyme to reactapp
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import Buildcontrols from '../../Components/Burger/BuildControls/BuildControls';


configure({adapter: new Adapter()});

describe('<BurgerBuilder/>',()=>{


    let wrapper;

    beforeEach(()=>{
        wrapper= shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    });

    
    it('should render build controls when receving ingredients',()=>{
            wrapper.setProps({
                ings:{
                    salad:0
                }
            })
            expect( wrapper.find(Buildcontrols))
            .toHaveLength(1);
    });


});